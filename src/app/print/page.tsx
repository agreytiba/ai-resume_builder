"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import ResumePreview from "@/components/ResumePreview";
import { mapToResumeValues } from "@/lib/utils";
import { fetchResume, fetchPaymentStatus } from "./actions";
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
          const paymentStatus = await fetchPaymentStatus(resumeId);

          if (!paymentStatus) {
            router.push("/pay");
            return;
          }

          const fetchedResume = await fetchResume(resumeId);
          setResume(fetchedResume);
          setIsReadyToPrint(true);
        } catch (error) {
          console.error(error);
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
      <style jsx global>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
          }
          @page {
            margin: 10mm;
            size: A4; /* or 'auto' for automatic size adjustment */
          }
          .resume-preview {
            page-break-inside: avoid;
            overflow: visible !important;
          }
        }
      `}</style>
      <div className="p-4">
        <ResumePreview
          resumeData={mapToResumeValues(resume)}
          contentRef={contentRef}
          className="resume-preview"
        />
      </div>
    </div>
  );
}
