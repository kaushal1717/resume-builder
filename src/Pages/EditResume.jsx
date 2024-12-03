import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "@/components/custom/FormSection";
import PreviewSection from "@/components/custom/PreviewSection";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import dummy from "@/data/dummy";
import GlobalApi from "@/service/GlobalApi";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const EditResume = () => {
  const params = useParams();
  const [resumeInfo, setResumeInfo] = useState(dummy);
  const [loading, setLoading] = useState(true);
  const [isNewResume, setIsNewResume] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (params.resumeId) {
      setLoading(true);
      getResumeInfo();
    } else {
      setLoading(false);
    }
  }, [params.resumeId]);

  const getResumeInfo = () => {
    GlobalApi.getResumeById(params.resumeId)
      .then((res) => {
        const response = res.data.data;
        console.log("Data : ", response.jobTitle);

        // Check if the resume is newly created
        const isNew =
          !response.firstName &&
          !response.lastName &&
          !response.jobTitle &&
          !response.email &&
          !response.phone &&
          !response.summary &&
          response.socialLinks.length === 0 &&
          response.experience.length === 0 &&
          response.education.length === 0 &&
          response.skills.length === 0;

        if (isNew) {
          setResumeInfo(dummy);
          setIsNewResume(true);
        } else {
          setResumeInfo(response);
          setIsNewResume(false);
        }

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="min-h-screen bg-gray-50">
        {/* Preview Toggle Button */}
        <div className="fixed bottom-8 right-6 z-50">
          <Button
            onClick={() => setShowPreview(!showPreview)}
            variant="outline"
            size="icon"
            className="rounded-full bg-white shadow-lg w-14 h-14"
          >
            {showPreview ? <EyeOffIcon size={35} /> : <EyeIcon size={35} />}
          </Button>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="max-w-5xl mx-auto">
            {/* Form Section */}
            <div className={showPreview ? 'hidden' : 'block'}>
              <FormSection />
            </div>

            {/* Preview Section */}
            <div className={!showPreview ? 'hidden' : 'block'}>
              {loading ? (
                <div className="flex items-center justify-center h-96">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <PreviewSection isNewResume={isNewResume} />
              )}
            </div>
          </div>
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
