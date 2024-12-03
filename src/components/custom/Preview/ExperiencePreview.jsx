import React from "react";
import DateFormatter from "../DateFormatter";

function ExperiencePreview({ resumeInfo }) {
  const expObj = resumeInfo?.experience || [];

  if (expObj.length === 0) return null;

  return (
    <div className="mt-4 lg:mt-6">
      <h2
        className="font-bold text-sm lg:text-base mb-2 text-center"
        style={{ color: resumeInfo?.themeColor }}
      >
        Professional Experience
      </h2>
      <hr className="mb-3" style={{ borderColor: resumeInfo?.themeColor }} />
      
      <div className="space-y-4">
        {expObj.map((exp, index) => (
          <div key={index} className="pb-2">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-baseline gap-1">
              <h3 className="text-sm lg:text-base font-bold capitalize">
                {exp?.title}
              </h3>
              <div className="text-xs lg:text-sm text-gray-600">
                <DateFormatter dateString={exp?.startDate} /> -{" "}
                <DateFormatter dateString={exp?.endDate} />
              </div>
            </div>
            
            <div className="text-xs lg:text-sm text-gray-600 mt-1">
              {exp?.companyName}
              {exp?.location && (
                <span className="ml-1">
                  • {exp.location}
                </span>
              )}
            </div>
            
            <div
              dangerouslySetInnerHTML={{ __html: exp?.workSummary }}
              className="text-xs lg:text-sm mt-2 leading-relaxed"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExperiencePreview;
