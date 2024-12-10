"use client";

import ResumePreview from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ResumeServerData } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";
import { formatDate } from "date-fns";
import { Printer, Trash2, Edit3 } from "lucide-react";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
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
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { toast } = useToast();

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingPrint, setIsLoadingPrint] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: resume.title || "Resume",
  });

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

  const handlePrint = async () => {
    setIsLoadingPrint(true);
    try {
      reactToPrintFn?.();
    } catch (error) {
      console.log(error as Error);
      toast({ title: "Failed to print resume", variant: "destructive" });
    } finally {
      setIsLoadingPrint(false);
    }
  };

  const wasUpdated = resume.updatedAt !== resume.createdAt;
if (isLoadingDelete) {
  return <ContentLoader />;
}
return (
  <div className="group relative rounded-lg border border-transparent bg-secondary p-3 transition-colors hover:border-border">
    {/* Action Buttons */}
    <div className="mb-3 flex justify-end space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsDialogOpen(true)}
        className="flex items-center space-x-1"
        disabled={isLoadingDelete}
      >
        <Trash2 className="h-4 w-4" />
        <span>Delete</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handlePrint}
        className="flex items-center space-x-1 sm:hidden md:block"
        disabled={isLoadingPrint}
      >
        <Printer className="h-4 w-4" />
        <span>Print</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push(`/editor?resumeId=${resume.id}`)}
        className="flex items-center space-x-1"
      >
        <Edit3 className="h-4 w-4" />
        <span>Edit</span>
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
          {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
        </p>
      </div>
      <div className="relative inline-block w-full">
        <ResumePreview
          resumeData={mapToResumeValues(resume)}
          contentRef={contentRef}
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
