import React from "react";

export default function ProjectsPreview({ resumeInfo }) {
  const str = "text-center";
  const projectsObj = resumeInfo?.projects || []; // Safeguard against undefined

  return (
    <div className='my-3'>
      <h2
        className={`${str} font-bold text-sm mb-2`}
        style={{ color: resumeInfo?.themeColor }}
      >
        Projects
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      {projectsObj.length > 0 ? (
        projectsObj.map((project, index) => (
          <div key={index}>
            <div className='flex justify-between items-center'>
              <h2 className='text-sm font-bold'>{project?.title}</h2>
              <div>
                {project?.links?.map((link, linkIndex) => (
                  <span key={linkIndex}>
                    <a
                      href={link.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-xs text-blue-500 hover:underline'
                    >
                      {link.placeholder}
                    </a>
                    {linkIndex < project.links.length - 1 && " | "}
                  </span>
                ))}
              </div>
            </div>
            <div className='text-xs mb-1'>{project?.techStack}</div>
            <div
              dangerouslySetInnerHTML={{ __html: project?.description }}
              className='text-xs my-1'
            />
          </div>
        ))
      ) : (
        <p className='text-xs text-center'>No projects added yet.</p>
      )}
    </div>
  );
}
