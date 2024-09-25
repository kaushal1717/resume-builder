import { Loader2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import GlobalApi from "@/service/GlobalApi";
import { useNavigate } from "react-router-dom";

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onCreate = () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        title: title,
        resumeId: uuid,
      },
    };
    GlobalApi.createNewResume(data).then(
      (res) => {
        console.log(res);
        if (res) {
          setLoading(false);
          // Store the new resume ID in local storage
          const resumeIds = JSON.parse(localStorage.getItem("resumeIds")) || [];
          resumeIds.push(res.data.data.documentId);
          localStorage.setItem("resumeIds", JSON.stringify(resumeIds));
          navigate(`/dashboard/resume/${res.data.data.documentId}/edit`);
        }
      },
      (e) => {
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <div
        className='p-14 py-24 border-2 items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed'
        onClick={() => setOpenDialog(true)}
      >
        <Plus />
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new resume</DialogTitle>
            <DialogDescription>
              <p>Add a title</p>
              <Input
                className='my-2'
                placeholder='Ex. Full stack developer'
                onChange={(e) => setTitle(e.target.value)}
              />
            </DialogDescription>
            <div className='flex justify-end gap-5'>
              <Button
                onClick={() => {
                  setOpenDialog(false);
                }}
                variant='ghost'
              >
                Cancel
              </Button>
              <Button disabled={!title || loading} onClick={() => onCreate()}>
                {loading ? <Loader2 className='animate-spin' /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
