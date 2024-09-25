import React from "react";
import DateFormatter from "../DateFormatter";

function EducationPreview({ resumeInfo }) {
  const eduObj = resumeInfo?.education || [];

  return (
    <div className='my-3'>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{ color: resumeInfo?.themeColor }}
      >
        Education
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      {eduObj.length > 0 ? (
        eduObj.map((education, index) => (
          <div key={index} className='my-5'>
            <h2 className='text-sm font-bold'>{education.universityName}</h2>
            <h2 className='text-xs flex justify-between'>
              {education?.degree} in {education?.major}
              <span>
                <DateFormatter dateString={education?.startDate} /> -{" "}
                <DateFormatter dateString={education?.endDate} />
              </span>
            </h2>
            <p className='text-xs my-2'>{education?.description}</p>
          </div>
        ))
      ) : (
        <p>No education details available.</p>
      )}
    </div>
  );
}

export default EducationPreview;
