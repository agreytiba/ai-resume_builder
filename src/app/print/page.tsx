"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import ResumePreview from "@/components/ResumePreview";
import { mapToResumeValues } from "@/lib/utils";
import { fetchResume, fetchPaymentStatus } from "./actions"; // Import both fetch functions
import { ResumeServerData } from "@/lib/types";
import ContentLoader from "@/components/ContentLoader";

export default function PrintPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const contentRef = useRef<HTMLDivElement>(null);
  const [resume, setResume] = useState<ResumeServerData | null>(null);
  const [isReadyToPrint, setIsReadyToPrint] = useState(false);

  const resumeId = searchParams.get("resumeId");
  if (!resumeId) {
    router.push("/resumes");
  }

  useEffect(() => {
    const checkPaymentAndLoadResume = async () => {
      if (resumeId) {
        try {
          // Check payment status
          const paymentStatus = await fetchPaymentStatus(resumeId);

          if (!paymentStatus) {
            router.push("/pay"); // Redirect to payment route
            return;
          }

          // Load resume data if payment status is true
          const fetchedResume = await fetchResume(resumeId);
          setResume(fetchedResume);
          setIsReadyToPrint(true);
        } catch (error) {
          console.error(error);
          // router.push("error"); // Navigate to an error page or handle gracefully
        }
      }
    };

    checkPaymentAndLoadResume();
  }, [resumeId, router]);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: resume?.title || "Resume",
  });

  useEffect(() => {
    if (isReadyToPrint) {
      const timeout = setTimeout(() => {
        reactToPrintFn();
        setIsReadyToPrint(false);
      }, 300);

      return () => clearTimeout(timeout);
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
