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
  const [recipientEmail, setRecipientEmail] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const { resumeId } = useParams();

  useEffect(() => {
    getResumeInfo();
  }, []);

  const getResumeInfo = () => {
    GlobalApi.getResumeById(resumeId).then((res) => {
      // console.log("Fetched resume info : ", res.data.data);
      setResumeInfo(res.data.data);
    });
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id='no-print'>
        <Header />
        <div className='mt-6 max-w-[820px] mx-auto'>
          <h2 className='text-center text-2xl font-medium'>
            Congrats! Your resume is ready
          </h2>
          <p className='text-center text-gray-400'>
            Now you can download the resume or share it to your friends
          </p>
          <div className='gap-[10px] flex justify-end my-10'>
            <Button onClick={handleDownload}>
              <Download />
            </Button>
            <RWebShare
              data={{
                text: "This is my resume",
                url: `http://localhost:5173/my-resume/${resumeId}/view`,
                title: "Careerai Resume Builder",
              }}
              onClick={() => console.log("shared successfully!")}
              disableNative
            >
              <Button>
                <Share2 />
              </Button>
            </RWebShare>
          </div>
        </div>
      </div>
      <div id='print-area' className='max-w-[820px] mx-auto my-10'>
        <PreviewSection />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
