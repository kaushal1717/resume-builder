/* eslint-disable react/prop-types */

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
    <div className="flex flex-col items-center px-4 lg:px-6">
      <div className="text-center mb-4 w-full">
        <h1 className="text-2xl lg:text-3xl font-bold break-words">
          {resumeInfo?.firstName} {resumeInfo?.lastName}
        </h1>
        <p className="text-gray-500 capitalize text-sm lg:text-base mt-1">
          {resumeInfo?.jobTitle}
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center items-center gap-2 lg:gap-4 text-sm lg:text-base">
        {resumeInfo?.phone && (
          <div className="flex items-center">
            <span className="contact-item">{resumeInfo.phone}</span>
          </div>
        )}
        
        {resumeInfo?.email && (
          <div className="flex items-center">
            {resumeInfo?.phone && <span className="mx-2 text-gray-300">|</span>}
            <a 
              href={`mailto:${resumeInfo.email}`}
              className="contact-item hover:text-primary transition-colors"
            >
              {resumeInfo.email}
            </a>
          </div>
        )}
        
        {resumeInfo?.socialLinks?.map((link, index) => (
          <div key={index} className="flex items-center">
            <span className="mx-2 text-gray-300">|</span>
            <a
              href={formatLink(link.link)}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item hover:text-primary transition-colors"
            >
              {link.platform}
            </a>
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
