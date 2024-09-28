import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash, Plus, Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import GlobalApi from "@/service/GlobalApi";
import { toast } from "sonner";

function PersonalDetails({ enableNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    phone: "",
    email: "",
    socialLinks: [{ link: "", platform: "" }],
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    enableNext(false);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };

  const handleSocialLinkChange = (e, index) => {
    const { name, value } = e.target;
    const newSocialLinks = formData.socialLinks.slice();
    newSocialLinks[index][name] = value;
    setFormData({
      ...formData,
      socialLinks: newSocialLinks.map(({ id, ...rest }) => rest),
    });
    setResumeInfo({
      ...resumeInfo,
      socialLinks: newSocialLinks.map(({ id, ...rest }) => rest),
    });
  };

  const addSocialLinkField = () => {
    const newSocialLinks = [
      ...formData.socialLinks,
      { link: "", platform: "" },
    ];
    setFormData({
      ...formData,
      socialLinks: newSocialLinks,
    });
    setResumeInfo({
      ...resumeInfo,
      socialLinks: newSocialLinks,
    });
  };

  const removeSocialLinkField = () => {
    const newSocialLinks = formData.socialLinks.slice(0, -1);
    setFormData({
      ...formData,
      socialLinks: newSocialLinks,
    });
    setResumeInfo({
      ...resumeInfo,
      socialLinks: newSocialLinks,
    });
  };

  const formatLink = (link) => {
    if (!link.startsWith("http://") && !link.startsWith("https://")) {
      return `https://${link}`;
    }
    return link;
  };

  const onSave = (e) => {
    setLoading(true);
    e.preventDefault();

    // Remove the 'id' field from each object in the 'socialLinks' array
    const cleanedSocialLinks = formData.socialLinks.map(
      ({ id, ...rest }) => rest
    );

    const formattedSocialLinks = cleanedSocialLinks.map((link) => ({
      ...link,
      link: formatLink(link.link),
    }));

    const data = {
      data: {
        ...formData,
        socialLinks: formattedSocialLinks,
      },
    };
    console.log("sent data: ", data.data);

    GlobalApi.updateUserResume(params?.resumeId, data).then(
      (res) => {
        console.log(res);
        enableNext(true);
        setLoading(false);
        toast.success("Personal details saved successfully", {
          duration: 2000,
        });
      },
      (err) => {
        setLoading(false);
        console.log(err);
        toast.error("Error saving personal details", {
          duration: 2000,
        });
      }
    );
    enableNext(true);
  };

  useEffect(() => {
    console.log(params);
    if (resumeInfo) {
      setFormData({
        firstName: resumeInfo.firstName || "",
        lastName: resumeInfo.lastName || "",
        jobTitle: resumeInfo.jobTitle || "",
        phone: resumeInfo.phone || "",
        email: resumeInfo.email || "",
        socialLinks: resumeInfo.socialLinks || [{ link: "", platform: "" }],
      });
    }
  }, [resumeInfo, params]);

  return (
    <div className='mt-3 p-5 shadow-lg shadow-gray-400 rounded-lg'>
      <h2 className='text-xl font-bold'>Personal details</h2>
      <p className='font-bold text-sm'>Get started with basic information.</p>
      <form onSubmit={onSave}>
        <div className='grid grid-cols-2 mt-5 gap-3'>
          <div>
            <label htmlFor='firstName' className='text-sm'>
              First Name
            </label>
            <Input
              required
              name='firstName'
              onChange={handleInputChange}
              value={formData.firstName}
            />
          </div>
          <div>
            <label htmlFor='lastName' className='text-sm'>
              Last Name
            </label>
            <Input
              required
              name='lastName'
              onChange={handleInputChange}
              value={formData.lastName}
            />
          </div>
          <div className='col-span-2'>
            <label htmlFor='jobTitle' className='text-sm'>
              Job title
            </label>
            <Input
              required
              name='jobTitle'
              onChange={handleInputChange}
              value={formData.jobTitle}
            />
          </div>
          <div>
            <label htmlFor='phone' className='text-sm'>
              Phone number
            </label>
            <Input
              required
              name='phone'
              onChange={handleInputChange}
              value={formData.phone}
            />
          </div>
          <div>
            <label htmlFor='email' className='text-sm'>
              Email address
            </label>
            <Input
              required
              name='email'
              onChange={handleInputChange}
              type='email'
              value={formData.email}
            />
          </div>
        </div>
        <div className='mt-5'>
          <h3 className='text-lg font-bold'>Social Links</h3>
          {formData.socialLinks.map((item, index) => (
            <div key={index} className='grid grid-cols-2 gap-3 my-5'>
              <div>
                <label
                  htmlFor={`socialLinks.${index}.platform`}
                  className='text-sm'
                >
                  Platform
                </label>
                <Input
                  required
                  name='platform'
                  value={item.platform}
                  onChange={(e) => handleSocialLinkChange(e, index)}
                />
              </div>
              <div>
                <label
                  htmlFor={`socialLinks.${index}.link`}
                  className='text-sm'
                >
                  Link
                </label>
                <Input
                  required
                  name='link'
                  value={item.link}
                  onChange={(e) => handleSocialLinkChange(e, index)}
                />
              </div>
            </div>
          ))}
          <div className='flex flex-row gap-2 justify-end'>
            <Button
              variant='outline'
              className='text-primary flex gap-2 mt-2'
              onClick={addSocialLinkField}
            >
              <Plus size={13} /> Add more social links
            </Button>
            <Button
              variant='destructive'
              className='mt-2 flex gap-2'
              onClick={removeSocialLinkField}
            >
              <Trash size={13} /> Remove
            </Button>
          </div>
        </div>
        <div className='mt-6 flex justify-end'>
          <Button type='submit' disabled={loading}>
            {loading ? <Loader2 className='animate-spin' /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;
