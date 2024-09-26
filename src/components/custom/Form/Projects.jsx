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
  techStack: "",
  description: "",
  links: [{ placeholder: "", link: "" }],
};

export default function Projects({ enableNext }) {
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(false);

  const params = useParams();

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    enableNext(false);
    if (resumeInfo?.projects.length > 0) {
      setProjectList(resumeInfo.projects);
    } else {
      setProjectList([formField]);
    }
  }, []);

  const handleChange = (event, index, linkIndex = null) => {
    enableNext(false);
    const newEntries = projectList.slice();
    const { name, value } = event.target;
    if (linkIndex !== null) {
      newEntries[index].links[linkIndex][name] = value;
    } else {
      newEntries[index][name] = value;
    }
    setProjectList(newEntries);
  };

  const addProjectField = () => {
    setProjectList([...projectList, { ...formField }]);
  };

  const removeProjectField = () => {
    setProjectList((projectList) => projectList.slice(0, -1));
  };

  const handleTextEditing = (e, name, index) => {
    const newEntries = projectList.slice();
    newEntries[index][name] = e.target.value;
    setProjectList(newEntries);
  };

  const addLinkField = (index) => {
    const newEntries = projectList.slice();
    newEntries[index].links.push({ placeholder: "", link: "" });
    setProjectList(newEntries);
  };

  const removeLinkField = (index) => {
    const newEntries = projectList.slice();
    newEntries[index].links.pop();
    setProjectList(newEntries);
  };

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, projects: projectList });
    console.log(projectList);
  }, [projectList]);

  const onSave = () => {
    setLoading(true);
    enableNext(true);
    const data = {
      data: {
        projects: projectList.map(({ id, ...rest }) => rest),
      },
    };
    console.log("data: " + JSON.stringify(data, null, 2));

    GlobalApi.updateUserResume(params?.resumeId, data)
      .then((res) => {
        console.log("saved :", res);
        setLoading(false);
        toast.success("Projects details updated successfully", {
          duration: 2000,
        });
      })
      .catch((error) => {
        console.error("Failed to save projects", error);
        toast.error("Failed to save projects");
        setLoading(false);
      });
  };

  return (
    <div>
      <div className='mt-3 p-5 shadow-lg shadow-gray-400 rounded-lg'>
        <h2 className='text-xl font-bold'>Add your projects</h2>
        <p className='font-bold text-sm'>Add relevant projects</p>
        <div>
          {projectList.map((item, index) => (
            <div key={index}>
              <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                <div>
                  <label htmlFor='title' className='text-xs'>
                    Project title
                  </label>
                  <Input
                    name='title'
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.title}
                  />
                </div>
                <div>
                  <label htmlFor='techStack' className='text-xs'>
                    Tech stack
                  </label>
                  <Input
                    name='techStack'
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.techStack}
                  />
                </div>
                <div className='col-span-2'>
                  <label htmlFor='description' className='text-xs'>
                    Description
                  </label>
                  <RichTextEditor
                    onTextEditing={(e) =>
                      handleTextEditing(e, "description", index)
                    }
                    defaultValue={item?.description}
                  />
                </div>
                <div className='col-span-2'>
                  <label className='text-xs'>Links</label>
                  {item.links.map((link, linkIndex) => (
                    <div key={linkIndex} className='flex gap-2'>
                      <Input
                        name='placeholder'
                        placeholder='Placeholder'
                        onChange={(e) => handleChange(e, index, linkIndex)}
                        defaultValue={link?.placeholder}
                      />
                      <Input
                        name='link'
                        placeholder='Link'
                        onChange={(e) => handleChange(e, index, linkIndex)}
                        defaultValue={link?.link}
                      />
                    </div>
                  ))}
                  <div className='flex gap-2 mt-2'>
                    <Button
                      variant='outline'
                      className='text-primary flex gap-2'
                      onClick={() => addLinkField(index)}
                    >
                      <Plus size={13} /> Add more links
                    </Button>
                    <Button
                      variant='destructive'
                      className='flex gap-2'
                      onClick={() => removeLinkField(index)}
                    >
                      <Trash size={13} /> Remove link
                    </Button>
                  </div>
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
              onClick={addProjectField}
            >
              <Plus size={13} /> Add more projects
            </Button>
            <Button
              variant='destructive'
              className='flex gap-2'
              onClick={removeProjectField}
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
