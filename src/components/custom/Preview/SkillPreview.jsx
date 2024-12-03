import React from "react";

function SkillPreview({ resumeInfo }) {
  const skillsObject = resumeInfo?.skills;

  if (!skillsObject?.length) return null;

  return (
    <div className="mt-4 md:mt-6">
      <h2
        className="font-bold text-sm md:text-base mb-2 text-center"
        style={{ color: resumeInfo?.themeColor }}
      >
        Skills
      </h2>
      <hr className="mb-3" style={{ borderColor: resumeInfo?.themeColor }} />
      
      <div className="space-y-2">
        {skillsObject.map((skill, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-1 md:gap-2">
            <span className="text-xs md:text-sm font-bold whitespace-nowrap">
              {skill?.skillType}:
            </span>
            <span className="text-xs md:text-sm text-gray-700 flex-1">
              {skill?.skillNames}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillPreview;
