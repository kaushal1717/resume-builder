import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "@/components/custom/FormSection";
import PreviewSection from "@/components/custom/PreviewSection";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import dummy from "@/data/dummy";
import GlobalApi from "@/service/GlobalApi";

const EditResume = () => {
  const params = useParams();
  const [resumeInfo, setResumeInfo] = useState(dummy);
  const [loading, setLoading] = useState(true);
  const [isNewResume, setIsNewResume] = useState(false);

  useEffect(() => {
    if (params.resumeId) {
      setLoading(true);
      getResumeInfo();
    } else {
      setLoading(false);
    }
  }, [params.resumeId]);

  const getResumeInfo = () => {
    GlobalApi.getResumeById(params.resumeId)
      .then((res) => {
        const response = res.data.data;
        console.log("Data : ", response);

        // Check if the resume is newly created
        const isNew =
          !response.firstName &&
          !response.lastName &&
          !response.jobTitle &&
          !response.email &&
          !response.phone &&
          !response.summary &&
          response.socialLinks.length === 0 &&
          response.experience.length === 0 &&
          response.education.length === 0 &&
          response.skills.length === 0;

        if (isNew) {
          setResumeInfo(dummy);
          setIsNewResume(true);
        } else {
          setResumeInfo(response);
          setIsNewResume(false);
        }

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
        <FormSection />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <PreviewSection isNewResume={isNewResume} />
        )}
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
