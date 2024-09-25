import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "@/service/GlobalApi";
import { Generator } from "@/service/GroqGen";
import { Loader2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function Summary({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState();
  const [generatedSummary, setGeneratedSummary] = useState();
  const params = useParams();

  const generateSummary = async () => {
    if (isRateLimited) {
      toast.error(
        "Avoid rapid, consecutive clicks to ensure smooth operation."
      );
      return;
    }
    setIsRateLimited(true);
    setLoading(true);
    try {
      const result = await Generator("summary", resumeInfo.jobTitle);
      console.log("Generated summary : ", result);

      setGeneratedSummary(result);
      console.log(generatedSummary);
    } catch (error) {
      console.error("Error generating summary:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setIsRateLimited(false);
      }, 5000); // Reset rate limit after 5 seconds
    }
  };

  const onSave = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      data: {
        summary: summary,
      },
    };
    GlobalApi.updateUserResume(params?.resumeId, data).then(
      (res) => {
        console.log(res);
        enableNext(true);
        setLoading(false);
        toast.success("Summary saved successfully", {
          duration: 2000,
        });
      },
      (err) => {
        setLoading(false);
        console.log(err);
        toast.error("Error saving summary", {
          duration: 2000,
        });
      }
    );
    enableNext(true);
  };

  useEffect(() => {
    summary &&
      setResumeInfo({
        ...resumeInfo,
        summary: summary,
      });
  }, [summary]);

  return (
    <div>
      <div className='mt-3 p-5 shadow-lg shadow-gray-400 rounded-lg'>
        <h2 className='text-xl font-bold'>Summary</h2>
        <p className='font-bold text-sm'>Add summary for your job title</p>
        <form className='mt-7' onSubmit={onSave}>
          <div className='flex justify-between items-end'>
            <label htmlFor=''>Add summary</label>
            <Button
              className='border-primary text-primary'
              size='sm'
              variant='outline'
              onClick={generateSummary}
              type='button'
            >
              Generate using AI
            </Button>
          </div>
          <Textarea
            className='mt-5'
            defaultValue={resumeInfo?.summary}
            onChange={(e) => {
              enableNext(false);
              setSummary(e.target.value);
            }}
          />
          <div className='mt-3 flex justify-end'>
            <Button variant='outline' type='submit' disabled={loading}>
              {loading ? <Loader2 className='animate-spin' /> : "Save"}
            </Button>
          </div>
          <p className='text-[7.5px]'>
            Note: Double check AI respose before adding it to resume
          </p>
        </form>
      </div>
      {generatedSummary && (
        <div>
          <h2 className='font-bold text-lg'>Suggestions</h2>
          {generatedSummary.map((item, index) => (
            <div key={index}>
              <h2 className='font-bold my-1' key={index}>
                {item.type}
              </h2>
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summary;
