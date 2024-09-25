import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Trash } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "@/service/GlobalApi";
import { toast } from "sonner";

function Education() {
  const [educationList, setEducationList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const handleChange = (e, index) => {
    const newEntries = educationList.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setEducationList(newEntries);
  };

  const addEducationField = () => {
    setEducationList([
      ...educationList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeEducationField = () => {
    setEducationList((educationlist) => educationlist.slice(0, -1));
  };

  useEffect(() => {
    resumeInfo && setEducationList(resumeInfo?.education);
  }, []);

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationList.map(({ id, ...rest }) => rest),
      },
    };

    console.log(JSON.stringify(data, null, 2));

    GlobalApi.updateUserResume(params.resumeId, data)
      .then((res) => {
        console.log("response: " + res);
        setLoading(false);
        toast.success("Saved education details");
      })
      .catch((err) => {
        console.error("error occured while saving education details", err);
        toast.error("error occured while saving education details");
        setLoading(false);
      });
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationList.map(({ id, ...rest }) => rest),
    });
  }, [educationList]);

  return (
    <div className='mt-3 p-5 shadow-lg shadow-gray-400 rounded-lg'>
      <h2 className='text-xl font-bold'>Add your experience</h2>
      <p className='font-bold text-sm'>Add relevant previous job experience</p>
      <div>
        {educationList.map((item, index) => (
          <div key={index}>
            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
              <div>
                <label htmlFor='universityName' className='text-xs'>
                  University / college name
                </label>
                <Input
                  name='universityName'
                  onChange={(e) => {
                    handleChange(e, index);
                  }}
                  defaultValue={item?.universityName}
                />
              </div>
              <div>
                <label htmlFor='degree' className='text-xs'>
                  Degree
                </label>
                <Input
                  name='degree'
                  onChange={(e) => {
                    handleChange(e, index);
                  }}
                  defaultValue={item?.degree}
                />
              </div>
              <div className='col-span-2 text-xs'>
                <label htmlFor='major'>Major in</label>
                <Input
                  name='major'
                  onChange={(e) => {
                    handleChange(e, index);
                  }}
                  defaultValue={item?.major}
                />
              </div>
              <div>
                <label htmlFor='startDate' className='text-xs'>
                  Start date
                </label>
                <Input
                  name='startDate'
                  className='no-calendar'
                  type='date'
                  onChange={(e) => {
                    handleChange(e, index);
                  }}
                  defaultValue={item?.startDate}
                />
              </div>
              <div>
                <label htmlFor='endDate' className='text-xs'>
                  End date
                </label>
                <Input
                  name='endDate'
                  className='no-calendar'
                  type='date'
                  onChange={(e) => {
                    handleChange(e, index);
                  }}
                  defaultValue={item?.endDate}
                />
              </div>
              <div className='col-span-2 text-xs'>
                <label htmlFor='description'>Description</label>
                <Textarea
                  name='description'
                  placeholder='CGPA - 9.00'
                  onChange={(e) => {
                    handleChange(e, index);
                  }}
                  defaultValue={item?.description}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <Button
            variant='outline'
            className='text-primary flex gap-2'
            onClick={addEducationField}
          >
            <Plus size={13} /> Add more experience
          </Button>
          <Button
            variant='destructive'
            className='flex gap-2'
            onClick={removeEducationField}
          >
            <Trash size={13} /> Remove
          </Button>
        </div>
        <Button onClick={onSave} disabled={loading}>
          {" "}
          {loading ? <Loader2 className='animate-spin' /> : "Save"}{" "}
        </Button>
      </div>
    </div>
  );
}

export default Education;
