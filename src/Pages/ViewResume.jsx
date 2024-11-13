import Header from "@/components/custom/Header";
import PreviewSection from "@/components/custom/PreviewSection";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "@/service/GlobalApi";
import { Download, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const [recipientEmail, setRecipientEmail] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState("");
  const { resumeId } = useParams();

  useEffect(() => {
    getResumeInfo();
  }, []);

  const getResumeInfo = () => {
    GlobalApi.getResumeById(resumeId).then((res) => {
      console.log("Fetched resume info : ", res.data.data);
      setResumeInfo(res.data.data);
    });
  };

  const handleDownload = () => {
    window.print();
  };

  const generatePDF = async () => {
    setIsLoading(true);
    const element = document.getElementById("print-area");
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      return pdf;
    } catch (error) {
      console.error("Error generating PDF:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (!recipientEmail || !senderEmail) {
      setError("Please enter both sender and recipient email addresses");
      return;
    }
    setError("");

    try {
      setIsLoading(true);
      const pdf = await generatePDF();
      const pdfBlob = pdf.output("blob");

      // Create FormData with the PDF
      const formData = new FormData();
      formData.append("files", pdfBlob, "resume.pdf");

      // Upload PDF to Strapi
      const uploadResponse = await GlobalApi.uploadFile(formData);
      const fileUrl = uploadResponse.data[0].url;

      // Send email with the file URL and sender's email
      const emailData = {
        to: recipientEmail,
        from: senderEmail,
        subject: "Resume Shared",
        html: `<p>Please find the resume attached.</p>`,
        attachments: [
          {
            url: fileUrl,
            name: "resume.pdf",
          },
        ],
      };

      await GlobalApi.sendEmail(emailData);
      setRecipientEmail("");
      setSenderEmail("");
      setDialogOpen(false);
      alert("Resume shared successfully!");
    } catch (error) {
      console.error("Error sharing resume:", error);
      setError("Failed to share resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="mt-6 max-w-[820px] mx-auto">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your resume is ready
          </h2>
          <p className="text-center text-gray-400">
            Now you can download the resume or share it to your friends
          </p>
          <div className="gap-[10px] flex justify-end my-10">
            <Button onClick={handleDownload}>
              <Download />
            </Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Share2 />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share Resume</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="senderEmail">Your Email Address</Label>
                    <Input
                      id="senderEmail"
                      type="email"
                      placeholder="Enter your email"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="recipientEmail">
                      Recipient&apos;s Email Address
                    </Label>
                    <Input
                      id="recipientEmail"
                      type="email"
                      placeholder="Enter recipient's email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-1">{error}</p>
                    )}
                  </div>
                  <Button
                    onClick={handleShare}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? "Sending..." : "Share Resume"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div id="print-area" className="max-w-[820px] mx-auto my-10">
        <PreviewSection />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
