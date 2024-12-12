"use client";

import ResumePreview from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ResumeServerData } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";
import { format } from "date-fns";
import { Printer, Trash2, Edit3 } from "lucide-react";
import { useState } from "react";

import { deleteResume } from "./actions";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ContentLoader from "@/components/ContentLoader";

interface ResumeItemProps {
  resume: ResumeServerData;
}

export default function ResumeItem({ resume }: ResumeItemProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Save resemuId to local storage
  const saveResumeIdToLocalStorage = (resumeId: string) => {
    localStorage.setItem("resumeId", resumeId);
  };

  // handle on click print/ download
  const handleNavigateToPrint = () => {
    // Navigate to the print page with resume data
    // router.push(`print?resumeId=${resume.id}`);
    if (resume.id) {
      saveResumeIdToLocalStorage(resume.id);
      router.push(`/print?resumeId=${resume.id}`);
    } else {
      // add toast hey to show file
    }
  };

  // handle delete Resume
  const handleDelete = async () => {
    setIsLoadingDelete(true);
    try {
      await deleteResume(resume.id);
      toast({ title: "Resume deleted successfully" });
      router.refresh();
    } catch (error) {
      console.log(error as Error);
      toast({ title: "Failed to delete resume", variant: "destructive" });
    } finally {
      setIsLoadingDelete(false);
      setIsDialogOpen(false);
    }
  };

  const wasUpdated = resume.updatedAt !== resume.createdAt;

  if (isLoadingDelete) {
    return <ContentLoader />;
  }

  return (
    <div className="group relative rounded-lg border border-transparent bg-secondary p-4 transition-colors hover:border-border">
      {/* Action Buttons */}
      <div className="mb-3 flex flex-wrap justify-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center space-x-1 border hover:bg-blue-200"
          disabled={isLoadingDelete}
          title={"delete"}
        >
          <Trash2 className="h-4 w-4" />
          {/* <span>Delete</span> */}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleNavigateToPrint}
          className="flex items-center border p-2 hover:bg-blue-200"
          title={"print or download"}
        >
          <Printer className="h-4 w-4" />
          <span>Print / Download</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push(`/editor?resumeId=${resume.id}`)}
          className="flex items-center space-x-1 border p-2 hover:bg-blue-200"
          title={"edit"}
        >
          <Edit3 className="h-4 w-4" />
          {/* <span>Edit</span> */}
        </Button>
      </div>

      {/* Resume Content */}
      <div className="space-y-3">
        <div className="inline-block w-full text-center">
          <p className="line-clamp-1 font-semibold">
            {resume.title || "No title"}
          </p>
          {resume.description && (
            <p className="line-clamp-2 text-sm">{resume.description}</p>
          )}
          <p className="text-xs text-muted-foreground">
            {wasUpdated ? "Updated" : "Created"} on{" "}
            {format(new Date(resume.updatedAt), "MMM d, yyyy h:mm a")}
          </p>
        </div>
        <div className="relative inline-block w-full">
          <ResumePreview
            resumeData={mapToResumeValues(resume)}
            className="overflow-hidden shadow-sm transition-shadow group-hover:shadow-lg"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>This will delete the resume permanently. Are you sure?</p>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoadingDelete}
            >
              {isLoadingDelete ? <span className="loader"></span> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


