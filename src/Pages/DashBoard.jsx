import AddResume from "../components/custom/AddResume";
import GlobalApi from "@/service/GlobalApi";
import { useEffect, useState } from "react";
import ResumeCard from "@/components/custom/ResumeCard";
import builder from "/builder.svg";

function DashBoard() {
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    getResumeList();
  }, []);

  const getResumeList = () => {
    const resumeIds = JSON.parse(localStorage.getItem("resumeIds")) || [];
    GlobalApi.getUserResume().then((res) => {
      console.log(res);
      // Filter resumes based on the IDs stored in local storage
      const filteredResumes = res.data.data.filter((resume) =>
        resumeIds.includes(resume.documentId)
      );
      setResumeList(filteredResumes);
    });
  };

  return (
    <div className='p-5 sm:p-8 md:px-20 lg:px-32'>
      <div className='flex flex-col md:flex-row items-center gap-5 md:gap-10'>
        <div className='flex flex-col'>
          <h2 className='font-bold text-2xl sm:text-3xl text-primary mb-4 sm:mb-8'>
            Create Your Professional Resume!
          </h2>
          <p className='text-gray-700 text-base sm:text-lg font-normal mb-2 sm:mb-4'>
            Our <span className='font-bold'>AI-powered</span> resume builder
            creates a personalized resume for you in minutes. <br />
          </p>
          <p className='text-gray-700 font-bold text-lg sm:text-xl'>
            Start Building!!👇
          </p>
        </div>
        <img
          src={builder}
          className='w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64'
          alt='Resume Builder'
        />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'>
        <AddResume />
        {resumeList.length > 0 &&
          resumeList.map((resume, index) => (
            <ResumeCard
              resume={resume}
              key={index}
              refreshData={getResumeList}
            />
          ))}
      </div>
    </div>
  );
}

export default DashBoard;
