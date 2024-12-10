"use client";
import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ResumeValues } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import DisplayTemplate from "../select-template/DisplayTemplate";

const Page: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const data = searchParams.get("data"); // Retrieve 'data' from query

  // Parse the data and explicitly type it as ResumeValues
  const resumeData: ResumeValues | null = data
    ? (JSON.parse(decodeURIComponent(data)) as ResumeValues)
    : null;



  const handleDownload = async () => {
    if (!contentRef.current) return;

    // Apply styles to the element
    const content = contentRef.current;
    content.style.zoom = "1";
    content.style.padding = "0";
    content.style.fontFamily = "'Inter', sans-serif";

    // Convert the referenced element into a canvas
    const canvas = await html2canvas(content, {
      scale: 1.7, // Moderate resolution
      useCORS: true, // Allow cross-origin
    });
    const imgData = canvas.toDataURL("image/jpeg", 1); // Use JPEG and reduce quality to 70%

    // Initialize jsPDF and set dimensions
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Add the image to the PDF and save
    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    pdf.setProperties({
      title: resumeData?.title || "Resume",
      subject: "Resume Document",
      creator: "Your App",
    });
    pdf.save(`${resumeData?.title || "resume"}.pdf`);
  };

  return (
    <div
      className="item-center flex aspect-[210/297] h-fit w-full grow justify-center"
      style={{ padding: "0.6cm" }}
    >
      <div style={{ width: "75%" }}>
        <button
          onClick={handleDownload}
          className="download-button"
          style={{
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        >
          Download as PDF
        </button>
        <div
          style={{
            fontFamily: "'Inter', sans-serif !important",
            // zoom: "1 !important",
          }}
          className="grow"
        >
          <DisplayTemplate template={1} contentRef={contentRef} />
        </div>
      </div>
    </div>
  );
};

export default Page;
