import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { Loader2, Plus, Trash } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "@/service/GlobalApi";
import { toast } from "sonner";

const formField = {
  title: "",
  companyName: "",
  location: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};

function Experience() {
  const [experienceList, setExperienceList] = useState([]);
  const [loading, setLoading] = useState(false);

  const params = useParams();

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    if (resumeInfo?.experience.length > 0) {
      setExperienceList(resumeInfo.experience);
    } else {
      setExperienceList([formField]);
    }
  }, []);

  const handleChange = (event, index) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const addExperienceField = () => {
    setExperienceList([...experienceList, { ...formField }]);
  };

  const removeExperienceField = () => {
    setExperienceList((experiencelist) => experiencelist.slice(0, -1));
  };

  const handleTextEditing = (e, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  };

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, experience: experienceList });
    console.log(experienceList);
  }, [experienceList]);

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        experience: experienceList.map(({ id, ...rest }) => rest),
      },
    };
    console.log("data: " + JSON.stringify(data, null, 2));

    console.log(experienceList);

    GlobalApi.updateUserResume(params?.resumeId, data).then(
      (res) => {
        console.log("saved :", res);
        setLoading(false);
        toast.success("Details updated !");
      },
      (error) => {
        console.error("Failed to save experience", error);
        toast.error("Failed to save experience");
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <div className='mt-3 p-5 shadow-lg shadow-gray-400 rounded-lg'>
        <h2 className='text-xl font-bold'>Add your experience</h2>
        <p className='font-bold text-sm'>
          Add relevant previous job experience
        </p>
        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                <div>
                  <label htmlFor='title' className='text-xs'>
                    Position title
                  </label>
                  <Input
                    name='title'
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.title}
                  />
                </div>
                <div>
                  <label htmlFor='companyName' className='text-xs'>
                    Company name
                  </label>
                  <Input
                    name='companyName'
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.companyName}
                  />
                </div>
                <div className='col-span-2'>
                  <label htmlFor='location' className='text-xs'>
                    Company location
                  </label>
                  <Input
                    name='location'
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.location}
                  />
                </div>
                <div>
                  <label htmlFor='startDate' className='text-xs'>
                    Start date
                  </label>
                  <Input
                    name='startDate'
                    type='date'
                    onChange={(e) => handleChange(e, index)}
                    className='no-calendar'
                    defaultValue={item?.startDate}
                  />
                </div>
                <div>
                  <label htmlFor='endDate' className='text-xs'>
                    End date
                  </label>
                  <Input
                    name='endDate'
                    type='date'
                    onChange={(e) => handleChange(e, index)}
                    className='no-calendar'
                    defaultValue={item?.endDate}
                  />
                </div>
                <div className='col-span-2'>
                  <label htmlFor='workSummary' className='text-xs'>
                    Description
                  </label>
                  <RichTextEditor
                    onTextEditing={(e) =>
                      handleTextEditing(e, "workSummary", index)
                    }
                    defaultValue={item?.workSummary}
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
              onClick={addExperienceField}
            >
              <Plus size={13} /> Add more experience
            </Button>
            <Button
              variant='destructive'
              className='flex gap-2'
              onClick={removeExperienceField}
            >
              <Trash size={13} /> Remove
            </Button>
          </div>
          <Button onClick={onSave} disabled={loading}>
            {loading ? <Loader2 className='animate-spin' /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
