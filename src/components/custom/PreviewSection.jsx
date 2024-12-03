import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext } from "react";
import PersonalDetailsPreview from "./Preview/PersonalDetailsPreview";
import SummarySection from "./Preview/SummarySection";
import ExperiencePreview from "./Preview/ExperiencePreview";
import EducationPreview from "./Preview/EducationPreview";
import SkillPreview from "./Preview/SkillPreview";
import ProjectsPreview from "./Preview/ProjectsPreview";

function PreviewSection() {
  const { resumeInfo } = useContext(ResumeInfoContext);
  
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div
        className="h-full p-4 md:p-5 border-t-[20px] shadow-md md:shadow-lg"
        style={{ borderColor: resumeInfo?.themeColor }}
      >
        <div className="max-w-[800px] mx-auto space-y-6">
          <PersonalDetailsPreview resumeInfo={resumeInfo} />
          <SummarySection resumeInfo={resumeInfo} />
          <EducationPreview resumeInfo={resumeInfo} />
          <ExperiencePreview resumeInfo={resumeInfo} />
          <ProjectsPreview resumeInfo={resumeInfo} />
          <SkillPreview resumeInfo={resumeInfo} />
        </div>
      </div>
    </div>
  );
}

export default PreviewSection;
