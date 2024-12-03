function SummarySection({ resumeInfo }) {
  if (!resumeInfo?.summary) return null;
  
  return (
    <div className="mt-4 lg:mt-6">
      <h2 
        className="font-bold text-sm lg:text-base mb-2 text-center"
        style={{ color: resumeInfo?.themeColor }}
      >
        Professional Summary
      </h2>
      <hr className="mb-3" style={{ borderColor: resumeInfo?.themeColor }} />
      <p className="text-xs lg:text-sm leading-relaxed text-justify">
        {resumeInfo?.summary}
      </p>
    </div>
  );
}

export default SummarySection;
