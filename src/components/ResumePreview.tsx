import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { formatDate } from "date-fns";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Badge } from "./ui/badge";
import TemplateSelector from "./TemplateSelector";
import { useSearchParams } from "next/navigation";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
  currentStep?: string;
}

export default function ResumePreview({
  resumeData,
  contentRef,
  className,
  currentStep,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef);

  const searchParams = useSearchParams();
  const template = searchParams.get("template");
  const resumeTemplate = template ? template : "1";

  console.log(typeof resumeTemplate);

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-black",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn("space-y-6 p-6", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        {/* <ResumePreviewTemplate4
          resumeData={resumeData}
          currentStep={currentStep}
        /> */}
        <TemplateSelector
          resumeData={resumeData}
          currentStep={currentStep}
          template={resumeTemplate}
        />
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
  currentStep?: string;
}

interface PersonalInfoHeaderProps extends ResumeSectionProps {
  position?: "left" | "center" | "right";
}

export function PersonalInfoHeader({
  resumeData,
  currentStep,
  position = "center", // default alignment is center
}: PersonalInfoHeaderProps) {
  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    phone,
    email,
    colorHex,
    borderStyle,
  } = resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);
  const [showIndicator, setShowIndicator] = useState(false);

  // Show indicator based on the current step
  useEffect(() => {
    if (currentStep === "personal-info") {
      setShowIndicator(true);
    }
    return () => setShowIndicator(false);
  }, [currentStep]);

  // Generate photo URL from file
  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div
      className={cn(
        "flex items-center gap-6 p-4",
        {
          "justify-start": position === "left",
          "justify-center": position === "center",
          "justify-end": position === "right",
        },
        showIndicator && "transition-all duration-300",
      )}
      style={{
        backgroundColor: showIndicator
          ? "rgba(218, 165, 32, 0.4)"
          : "transparent",
      }}
    >
      {photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
          alt="Author photo"
          className="aspect-square object-cover"
          style={{
            borderRadius:
              borderStyle === BorderStyles.SQUARE
                ? "0px"
                : borderStyle === BorderStyles.CIRCLE
                  ? "9999px"
                  : "10%",
          }}
        />
      )}
      <div className="space-y-3">
        {/* Name and Job Title */}
        <div className="space-y-1">
          <p
            className="text-4xl font-extrabold tracking-tight"
            style={{
              color: colorHex,
            }}
          >
            {firstName} {lastName}
          </p>
          <p
            className="text-lg font-medium tracking-wide"
            style={{
              color: colorHex,
            }}
          >
            {jobTitle}
          </p>
        </div>

        {/* Location and Contact Info */}
        <p className="text-sm text-gray-600">
          {city}
          {city && country ? ", " : ""}
          {country}
          {(city || country) && (phone || email) ? " • " : ""}
          {[phone, email].filter(Boolean).join(" • ")}
        </p>
      </div>
    </div>
  );
}

export function SummarySection({
  resumeData,
  currentStep,
}: ResumeSectionProps) {
  const { summary, colorHex } = resumeData;
  const [showIndicator, setShowIndicator] = useState(false);

  //  useEffect to check change in currentStep and show indicator
  useEffect(() => {
    if (currentStep === "summary") {
      setShowIndicator(true);
    }
    return () => setShowIndicator(false);
  }, [currentStep]);

  if (!summary) return null;
  return (
    <>
      <hr
        className="border-1"
        style={{
          borderColor: colorHex,
        }}
      />
      <div
        className="break-inside-avoid space-y-3 p-1"
        style={{
          backgroundColor: showIndicator
            ? "rgba(218, 165, 32, 0.4)"
            : "transparent",
        }}
      >
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Professional profile
        </p>
        <div className="whitespace-pre-line text-sm">{summary}</div>
      </div>
    </>
  );
}

export function WorkExperienceSection({
  resumeData,
  currentStep,
}: ResumeSectionProps) {
  const { workExperiences, colorHex } = resumeData;
  const [showIndicator, setShowIndicator] = useState(false);

  //  useEffect to check change in currentStep and show indicator
  useEffect(() => {
    if (currentStep === "work-experience") {
      setShowIndicator(true);
    }
    return () => setShowIndicator(false);
  }, [currentStep]);

  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0,
  );

  if (!workExperiencesNotEmpty?.length) return null;

  return (
    <>
      <hr
        className="border-1"
        style={{
          borderColor: colorHex,
        }}
      />
      <div
        className="space-y-3 p-1"
        style={{
          backgroundColor: showIndicator
            ? "rgba(218, 165, 32, 0.4)"
            : "transparent",
        }}
      >
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Work experience
        </p>
        {workExperiencesNotEmpty.map((exp, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div
              className="flex items-center justify-between text-sm font-semibold"
              style={{
                color: colorHex,
              }}
            >
              <span>{exp.position}</span>
              {exp.startDate && (
                <span>
                  {formatDate(exp.startDate, "MM/yyyy")} -{" "}
                  {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{exp.company}</p>
            <div className="whitespace-pre-line text-xs">{exp.description}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export function EducationSection({
  resumeData,
  currentStep,
}: ResumeSectionProps) {
  const { educations, colorHex } = resumeData;
  const [showIndicator, setShowIndicator] = useState(false);

  //  useEffect to check change in currentStep and show indicator
  useEffect(() => {
    if (currentStep === "education") {
      setShowIndicator(true);
    }
    return () => setShowIndicator(false);
  }, [currentStep]);
  const educationsNotEmpty = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0,
  );

  if (!educationsNotEmpty?.length) return null;

  return (
    <>
      <hr
        className="border-1"
        style={{
          borderColor: colorHex,
        }}
      />
      <div
        className="space-y-3 p-1"
        style={{
          backgroundColor: showIndicator
            ? "rgba(218, 165, 32, 0.4)"
            : "transparent",
        }}
      >
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Education
        </p>
        {educationsNotEmpty.map((edu, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div
              className="flex items-center justify-between text-sm font-semibold"
              style={{
                color: colorHex,
              }}
            >
              <span>{edu.degree}</span>
              {edu.startDate && (
                <span>
                  {edu.startDate &&
                    `${formatDate(edu.startDate, "MM/yyyy")} ${edu.endDate ? `- ${formatDate(edu.endDate, "MM/yyyy")}` : ""}`}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{edu.school}</p>
          </div>
        ))}
      </div>
    </>
  );
}

// Language preview section
export function LanguagesSection({
  resumeData,
  currentStep,
}: ResumeSectionProps) {
  const { languages, colorHex, borderStyle } = resumeData;
  const [showIndicator, setShowIndicator] = useState(false);

  //  useEffect to check change in currentStep and show indicator
  useEffect(() => {
    if (currentStep === "language") {
      setShowIndicator(true);
    }
    return () => setShowIndicator(false);
  }, [currentStep]);

  if (!languages?.length) return null;

  return (
    <>
      <hr
        className="border-1"
        style={{
          borderColor: colorHex,
        }}
      />
      <div
        className="break-inside-avoid space-y-3 p-1"
        style={{
          backgroundColor: showIndicator
            ? "rgba(218, 165, 32, 0.4)"
            : "transparent",
        }}
      >
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Language proficiency
        </p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
          {languages.map((language, index) => (
            <Badge
              key={index}
              className="rounded-md bg-black text-white hover:bg-black"
              style={{
                backgroundColor: colorHex,
                borderRadius:
                  borderStyle === BorderStyles.SQUARE
                    ? "0px"
                    : borderStyle === BorderStyles.CIRCLE
                      ? "9999px"
                      : "8px",
              }}
            >
              {language}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}
export function SkillsSection({ resumeData, currentStep }: ResumeSectionProps) {
  const { skills, colorHex, borderStyle } = resumeData;
  const [showIndicator, setShowIndicator] = useState(false);

  //  useEffect to check change in currentStep and show indicator
  useEffect(() => {
    if (currentStep === "skills") {
      setShowIndicator(true);
    }
    return () => setShowIndicator(false);
  }, [currentStep]);
  if (!skills?.length) return null;

  return (
    <>
      <hr
        className="border-1"
        style={{
          borderColor: colorHex,
        }}
      />
      <div
        className="break-inside-avoid space-y-3 p-1"
        style={{
          backgroundColor: showIndicator
            ? "rgba(218, 165, 32, 0.4)"
            : "transparent",
        }}
      >
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Skills
        </p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              className="rounded-md bg-black text-white hover:bg-black"
              style={{
                backgroundColor: colorHex,
                borderRadius:
                  borderStyle === BorderStyles.SQUARE
                    ? "0px"
                    : borderStyle === BorderStyles.CIRCLE
                      ? "9999px"
                      : "8px",
              }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}

// reference section
export function ReferenceSection({
  resumeData,
  currentStep,
}: ResumeSectionProps) {
  const { references, colorHex } = resumeData;
  const [showIndicator, setShowIndicator] = useState(false);

  //  useEffect to check change in currentStep and show indicator
  useEffect(() => {
    if (currentStep === "reference") {
      setShowIndicator(true);
    }
    return () => setShowIndicator(false);
  }, [currentStep]);
  const referencesNotEmpty = references?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0,
  );

  if (!referencesNotEmpty?.length) return null;

  return (
    <>
      <hr
        className="border-1"
        style={{
          borderColor: colorHex,
        }}
      />
      <div
        className="space-y-3 p-1"
        style={{
          backgroundColor: showIndicator
            ? "rgba(218, 165, 32, 0.4)"
            : "transparent",
        }}
      >
        <p
          className="text-xl font-semibold"
          style={{
            color: colorHex,
          }}
        >
          References
        </p>
        <div className="grid grid-cols-2 gap-3">
          {referencesNotEmpty.map((ref, index) => (
            <div key={index} className="break-inside-avoid space-y-1">
              <div
                className="flex items-center justify-between text-xl font-semibold"
                style={{
                  color: colorHex,
                }}
              >
                <span className="text-lg font-semibold">
                  {ref.referenceFirstName} {ref.referenceLastName}
                </span>
              </div>
              <p className="text-lg">
                {ref.referenceJobTitle} ,
                <span className="text-lg">{ref.referenceCompanyName}</span>
              </p>

              <p className="text-xs">{ref.referenceEmail}</p>
              <p className="text-xs">{ref.referencePhone}</p>
              <p className="text-xs">{ref.referenceAddress}</p>
              <p className="text-xs">{ref.referenceDescription}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
