import React from "react";
import DateFormatter from "../DateFormatter";

function ExperiencePreview({ resumeInfo }) {
  const str = "text-center";
  const expObj = resumeInfo?.experience || []; // Safeguard against undefined

  if (expObj.length === 0) return null;
  return (
    <div className='my-3'>
      <h2
        className={`${str} font-bold text-sm mb-2`}
        style={{ color: resumeInfo?.themeColor }}
      >
        Professional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      {expObj.length > 0
        ? expObj.map((exp, index) => (
            <div key={index}>
              <h2 className='text-sm font-bold'>{exp?.title}</h2>
              <h2 className='text-xs flex justify-between'>
                {exp?.companyName}, {exp?.location}
                <span>
                  <DateFormatter dateString={exp?.startDate} /> -{" "}
                  <DateFormatter dateString={exp?.endDate} />
                </span>
              </h2>
              <div
                dangerouslySetInnerHTML={{ __html: exp?.workSummary }}
                className='text-xs my-2'
              />
            </div>
          ))
        : null}
    </div>
  );
}

export default ExperiencePreview;
