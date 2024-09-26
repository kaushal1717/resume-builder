import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext } from "react";
import PersonalDetailsPreview from "./Preview/PersonalDetailsPreview";
import SummarySection from "./Preview/SummarySection";
import ExperiencePreview from "./Preview/ExperiencePreview";
import EducationPreview from "./Preview/EducationPreview";
import SkillPreview from "./Preview/SkillPreview";
import ProjectsPreview from "./Preview/ProjectsPreview";

function PreviewSection() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  return (
    <>
      <div
        className='shadow-lg h-full p-5 border-t-[20px]'
        style={{ borderColor: resumeInfo?.themeColor }}
      >
        <PersonalDetailsPreview resumeInfo={resumeInfo} />
        <SummarySection resumeInfo={resumeInfo} />
        <EducationPreview resumeInfo={resumeInfo} />
        <ExperiencePreview resumeInfo={resumeInfo} />
        <ProjectsPreview resumeInfo={resumeInfo} />
        <SkillPreview resumeInfo={resumeInfo} />
      </div>
    </>
  );
}

export default PreviewSection;
