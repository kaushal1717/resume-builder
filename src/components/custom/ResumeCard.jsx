import { File, Loader2, MoreVertical } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import GlobalApi from "@/service/GlobalApi";
import { toast } from "sonner";

function ResumeCard({ resume, refreshData }) {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const onDelete = (e) => {
    const resumeIds = JSON.parse(localStorage.getItem("resumeIds")) || [];
    e.stopPropagation();
    setLoading(true);
    GlobalApi.deleteResumeById(resume.documentId)
      .then((res) => {
        const updatedResumeIds = resumeIds.filter(
          (id) => id !== resume.documentId
        );
        localStorage.setItem("resumeIds", JSON.stringify(updatedResumeIds));
        console.log(res);
        toast.success("resume deleted successfully");
        refreshData();
        setLoading(false);
        setOpenDialog(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Error occured while deleting resume");
      });
  };
  return (
    <div className="border border-accent hover:scale-105 transition-all hover:shadow-lg rounded-lg h-[280px] bg-white">
      <Link to={"/dashboard/resume/" + resume.documentId + "/edit"}>
        <div className="p-14  flex items-center justify-center h-[250px] rounded-t-lg">
          <File className="text-accent" />
        </div>
      </Link>
      <div className="flex flex-row justify-between px-2">
        <h2 className="text-accent">{resume.title}</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className="cursor-pointer">
              <MoreVertical className="h-4 w-4 text-accent" />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/dashboard/resume/${resume.documentId}/edit`);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/my-resume/${resume.documentId}/view`);
              }}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/my-resume/${resume.documentId}/view`);
              }}
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setOpenDialog(true);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog open={openDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                resume and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenDialog(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  onDelete(e);
                }}
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Confirm"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeCard;
