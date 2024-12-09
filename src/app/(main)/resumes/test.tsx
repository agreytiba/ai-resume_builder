"use client";

// import LoadingButton from "@/components/LoadingButton";
import ResumePreview from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ResumeServerData } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";
import { formatDate } from "date-fns";
import { Printer, Trash2, Edit3 } from "lucide-react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { deleteResume } from "./actions";
import { useRouter } from "next/navigation";

interface ResumeItemProps {
  resume: ResumeServerData;
}

export default function ResumeItem({ resume }: ResumeItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { toast } = useToast();

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: resume.title || "Resume",
  });

  const handleDelete = async () => {
    try {
      await deleteResume(resume.id);
      toast({ title: "Resume deleted successfully" });
      router.refresh();
    } catch (error) {
      console.log(error as Error);
      toast({ title: "Failed to delete resume", variant: "destructive" });
    }
  };

  const wasUpdated = resume.updatedAt !== resume.createdAt;

  return (
    <div className="group relative rounded-lg border border-transparent bg-secondary p-3 transition-colors hover:border-border">
      {/* Action Buttons */}
      <div className="mb-3 flex justify-end space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          className="flex items-center space-x-1"
        >
          <Trash2 className="h-4 w-4" />
          <span>Delete</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => reactToPrintFn?.()}
          className="flex items-center space-x-1"
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
    </div>
  );
}
