import Header from "@/components/custom/Header";
import PreviewSection from "@/components/custom/PreviewSection";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();
  useEffect(() => {
    getResumeInfo();
  }, []);
  const getResumeInfo = () => {
    GlobalApi.getResumeById(resumeId).then((res) => {
      console.log("Fetched resume info : ", res.data.data);
      setResumeInfo(res.data.data);
    });
  };
  const handleDownload = () => {
    window.print();
  };
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id='no-print'>
        <Header />
        <div>
          <h2 className='text-center text-2xl font-medium'>
            Congrats! Your resume is ready
          </h2>
          <p className='text-center text-gray-400'>
            Now you can download the resume or share it to your friends
          </p>
          <div className='justify-between flex px-44 my-10'>
            <Button onClick={handleDownload}>Download</Button>
            <Button>Share</Button>
          </div>
        </div>
      </div>
      <div id='print-area' className='my-10 mx-10 md:mx-20 lg:mx-36'>
        <PreviewSection />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
