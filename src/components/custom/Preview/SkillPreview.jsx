import React from "react";

function SkillPreview({ resumeInfo }) {
  const skillsObject = resumeInfo?.skills;
  console.log("Skills : ", skillsObject);

  return (
    <div className='my-3'>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{ color: resumeInfo?.themeColor }}
      >
        Skills
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      {skillsObject &&
        skillsObject.map((skill, index) => (
          <div key={index}>
            <div>
              <span className='text-xs font-bold'> {skill?.skillType} : </span>{" "}
              <span className='text-xs'>{skill?.skillNames}</span>
            </div>
          </div>
        ))}
    </div>
  );
}

export default SkillPreview;
