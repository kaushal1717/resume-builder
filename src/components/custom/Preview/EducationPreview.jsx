import React from "react";
import DateFormatter from "../DateFormatter";

function EducationPreview({ resumeInfo }) {
  const eduObj = resumeInfo?.education || [];

  if (eduObj.length === 0) return null;

  return (
    <div className="mt-4 md:mt-6">
      <h2
        className="font-bold text-sm md:text-base mb-2 text-center"
        style={{ color: resumeInfo?.themeColor }}
      >
        Education
      </h2>
      <hr className="mb-3" style={{ borderColor: resumeInfo?.themeColor }} />
      
      <div className="space-y-4">
        {eduObj.map((education, index) => (
          <div key={index} className="pb-2">
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1">
              <h3 className="text-sm md:text-base font-bold capitalize">
                {education.universityName}
              </h3>
              <div className="text-xs md:text-sm text-gray-600">
                <DateFormatter dateString={education?.startDate} /> -{" "}
                <DateFormatter dateString={education?.endDate} />
              </div>
            </div>
            
            <div className="text-xs md:text-sm text-gray-600 mt-1">
              <span className="capitalize">{education?.degree}</span>
              {education?.major && (
                <span>
                  {" "}in <span className="capitalize">{education.major}</span>
                </span>
              )}
            </div>
            
            {education?.description && (
              <p className="text-xs md:text-sm mt-2 leading-relaxed text-gray-700">
                {education.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EducationPreview;
