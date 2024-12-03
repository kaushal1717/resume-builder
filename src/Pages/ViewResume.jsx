/* eslint-disable react-hooks/exhaustive-deps */
import Header from "@/components/custom/Header";
import PreviewSection from "@/components/custom/PreviewSection";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "@/service/GlobalApi";
import { Download, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RWebShare } from "react-web-share";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { resumeId } = useParams();

  useEffect(() => {
    getResumeInfo();
  }, []);

  const getResumeInfo = () => {
    setIsLoading(true);
    setError("");
    GlobalApi.getResumeById(resumeId)
      .then((res) => {
        setResumeInfo(res.data.data);
      })
      .catch((err) => {
        setError("Failed to load resume. Please try again.");
        console.error("Error loading resume:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDownload = () => {
    window.print();
  };

  const baseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="min-h-screen bg-gray-50">
        <div id="no-print">
          <Header />
          <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center space-y-2 mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  Congrats! Your resume is ready
                </h2>
                <p className="text-sm sm:text-base text-gray-500">
                  Now you can download the resume or share it with your friends
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm text-center">
                  {error}
                </div>
              )}

              <div className="flex justify-center sm:justify-end gap-3 mb-8">
                <Button 
                  onClick={handleDownload}
                  className="flex items-center gap-2"
                  size="sm"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download</span>
                </Button>
                
                <RWebShare
                  data={{
                    text: "This is my resume",
                    url: `${baseUrl}/my-resume/${resumeId}/view`,
                    title: "Careerai Resume Builder",
                  }}
                  onClick={() => console.log("shared successfully!")}
                  disableNative
                >
                  <Button 
                    className="flex items-center gap-2"
                    size="sm"
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Share</span>
                  </Button>
                </RWebShare>
              </div>
            </div>
          </div>
        </div>

        <div id="print-area" className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-[820px] mx-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <PreviewSection />
            )}
          </div>
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
