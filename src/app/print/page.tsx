"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import ResumePreview from "@/components/ResumePreview";
import { mapToResumeValues } from "@/lib/utils";
import { fetchResume } from "./actions"; // Import the fetch function
import { ResumeServerData } from "@/lib/types";
import ContentLoader from "@/components/ContentLoader";

export default function PrintPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const contentRef = useRef<HTMLDivElement>(null);
  const [resume, setResume] = useState<ResumeServerData | null>(null); // Use the defined type
  const [isReadyToPrint, setIsReadyToPrint] = useState(false); // Track printing readiness

  const resumeId = searchParams.get("resumeId");
  if (!resumeId) {
    router.push("/resumes");
  }

  useEffect(() => {
    const loadResume = async () => {
      if (resumeId) {
        try {
          const fetchedResume = await fetchResume(resumeId);
          setResume(fetchedResume);
          setIsReadyToPrint(true); // Mark as ready to print after data is fetched
        } catch (error) {
          console.error(error);
          // router.push("error"); // Navigate to an error page or handle gracefully
        }
      }
    };

    loadResume();
  }, [resumeId]);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: resume?.title || "Resume", // Safely access 'title'
  });

  useEffect(() => {
    if (isReadyToPrint) {
      const timeout = setTimeout(() => {
        reactToPrintFn(); // Trigger print after delay
        setIsReadyToPrint(false);
      }, 300); // Adjust delay as needed

      return () => clearTimeout(timeout); // Cleanup timeout
    }
  }, [isReadyToPrint, reactToPrintFn]);

  if (!resume) {
    return <ContentLoader />;
  }

  return (
    <div>
      <div className="p-4">
        <ResumePreview
          resumeData={mapToResumeValues(resume)}
          contentRef={contentRef}
          className="overflow-hidden shadow-sm transition-shadow"
        />
      </div>
    </div>
  );
}
