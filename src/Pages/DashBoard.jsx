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
        resumeIds.includes(resume.documentId),
      );
      setResumeList(filteredResumes);
    });
  };

  return (
    <div className="bg-dot p-10 md:px-20 lg:px-32">
      <div className="flex items-center gap-10">
        <div className="flex-row">
          <h2 className="font-bold text-3xl text-primary mb-8">
            Create Your Professional Resume!
          </h2>
          <p className="text-gray-700 pb-2 text-lg font-normal mb-4">
            Our <span className="font-bold">AI-powered</span> resume builder
            creates a personalized resume for you in minutes. <br />
          </p>

          <p className="text-gray-700 font-bold text-xl ">Start Building!!👇</p>
        </div>
        <img src={builder} width={250} height={250} alt="Resume Builder" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
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
