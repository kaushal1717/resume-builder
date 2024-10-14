import React from "react";

function PreviewSection({ resumeInfo }) {
  const formatLink = (link) => {
    if (!link.startsWith("http://") && !link.startsWith("https://")) {
      return `https://${link}`;
    }
    return link;
  };

  // Debugging statement to check resumeInfo
  console.log("Resume Info in PreviewSection:", resumeInfo);

  return (
    <div className='flex flex-col items-center'>
      <div className='text-center mb-4'>
        <h1 className='text-3xl font-bold'>
          {resumeInfo?.firstName} {resumeInfo?.lastName}
        </h1>
        <p className='text-gray-500 capitalize'>{resumeInfo?.jobTitle}</p>
      </div>
      <div className='flex justify-center items-center space-x-4'>
        <div className='flex-item'>{resumeInfo?.phone}</div>
        <div className='separator'>|</div>
        <a href={`mailto:${resumeInfo?.email}`} className='flex-item'>
          {resumeInfo?.email}
        </a>
        {resumeInfo?.socialLinks &&
          resumeInfo.socialLinks.map((link, index) => (
            <div key={index} className='flex items-center space-x-4'>
              <div className='separator'>|</div>
              <div className='flex-item'>
                <a
                  href={formatLink(link.link)}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {link.platform}
                </a>
              </div>
            </div>
          ))}
      </div>
      <div className='mt-8'>
        {/* Add other sections like Experience, Education, Skills, etc. */}
      </div>
    </div>
  );
}

export default PreviewSection;
