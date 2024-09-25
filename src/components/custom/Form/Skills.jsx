import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Trash } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "@/service/GlobalApi";
import { toast } from "sonner";

export default function Skills() {
  const [skillList, setSkillList] = useState([
    {
      skillType: "",
      skillNames: "",
    },
  ]);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const handleChange = (e, index) => {
    const newEntries = skillList.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setSkillList(newEntries);
  };

  const addSkillField = () => {
    setSkillList([
      ...skillList,
      {
        skillType: "",
        skillNames: "",
      },
    ]);
  };

  const removeSkillField = () => {
    setSkillList((skillList) => skillList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        skills: skillList,
      },
    };

    console.log("Data being sent to Strapi:", JSON.stringify(data, null, 2));

    GlobalApi.updateUserResume(params.resumeId, data)
      .then((res) => {
        console.log("response from Strapi:", res);
        setLoading(false);
        toast.success("Saved skill details");
      })
      .catch((err) => {
        console.error("error occured while saving skill details", err);
        toast.error("error occured while saving skill details");
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log("Updated skillList:", skillList);

    setResumeInfo({
      ...resumeInfo,
      skills: skillList.map(({ id, ...rest }) => rest),
    });
  }, [skillList]);

  useEffect(() => {
    // Initialize skillList with the data from resumeInfo
    if (resumeInfo?.skills) {
      setSkillList(resumeInfo.skills);
    }
  }, []);

  return (
    <div className='mt-3 p-5 shadow-lg shadow-gray-400 rounded-lg'>
      <h2 className='text-xl font-bold'>Add your skills</h2>
      <p className='font-bold text-sm'>Add relevant skills</p>
      <div>
        {skillList.map((item, index) => (
          <div key={index}>
            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
              <div>
                <label htmlFor='skillType' className='text-xs'>
                  Skill Type
                </label>
                <Input
                  name='skillType'
                  onChange={(e) => {
                    handleChange(e, index);
                  }}
                  defaultValue={item?.skillType}
                />
              </div>
              <div>
                <label htmlFor='skillNames' className='text-xs'>
                  Skill Names
                </label>
                <Input
                  name='skillNames'
                  onChange={(e) => {
                    handleChange(e, index);
                  }}
                  defaultValue={item?.skillNames}
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
            onClick={addSkillField}
          >
            <Plus size={13} /> Add more skills
          </Button>
          <Button
            variant='destructive'
            className='flex gap-2'
            onClick={removeSkillField}
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
