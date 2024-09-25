import AddResume from "../components/custom/AddResume";
import GlobalApi from "@/service/GlobalApi";
import { useEffect, useState } from "react";
import ResumeCard from "@/components/custom/ResumeCard";

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
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My resume</h2>
      <p>Start creating a resume to your job role</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'>
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
