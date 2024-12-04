"use client";

import ResumePreview from "@/components/ResumePreview";
import { ResumeServerData } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";
import { Link } from "lucide-react";

interface ResumeItemProps {
  resume: ResumeServerData;
}

export default function ResumeTemplate({ resume }: ResumeItemProps) {
  return (
    <div className="group relative rounded-lg border border-transparent bg-secondary p-3 transition-colors hover:border-border">
      <div className="space-y-3">
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="relative inline-block w-full"
        >
          <ResumePreview
            resumeData={mapToResumeValues(resume)}
            className="overflow-hidden shadow-sm transition-shadow group-hover:shadow-lg"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </Link>
      </div>
    </div>
  );
}
