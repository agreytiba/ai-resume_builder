"use client";
import data from "@/lib/data.json"; // Import the data.json file
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";

import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { formatDate } from "date-fns";

import { Badge } from "@/components//ui/badge";
import useDimensions from "@/hooks/useDimensions";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import ContentLoader from "@/components/ContentLoader";
import DisplayTemplateSelector from "./DisplayTemplateSelector";

interface DisplayTemplateProps {
  template: number;
  contentRef?: React.Ref<HTMLDivElement>;
}
export default function DisplayTemplate({
  template = 1,
  contentRef,
}: DisplayTemplateProps) {
  const resumeData: ResumeValues = data; // Use imported JSON data
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { width } = useDimensions(containerRef);

  // onClick navigate to othe page
  const router = useRouter();

  const handleClick = () => {
    setIsLoading(true);
    router.push(`/editor?template=${template}`);
  };
  if (isLoading) {
    return <ContentLoader />;
  }
  return (
    <div
      className={cn(
        "border-1 hover: aspect-[210/297] h-fit w-full cursor-pointer rounded-lg bg-[#faf8ff] p-2 text-black shadow-md transition duration-200 hover:bg-gray-500 hover:shadow-lg",
      )}
      onClick={handleClick}
      ref={containerRef}
    >
      <div>
        <div
          className={cn("space-y-6", !width && "invisible")}
          style={{
            zoom: (1 / 794) * width,
          }}
          ref={contentRef}
          id="resumePreviewContent"
        >
          <div
            className={cn("aspect-[210/297] h-fit w-full bg-white text-black")}
          >
            <div className={cn("space-y-6 p-6")} id="resumePreviewContent">
              <DisplayTemplateSelector
                resumeData={resumeData}
                template={template}
                isDownloaded={false}
                Payment_status={false}
                enable_edit={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
}

interface PersonalInfoHeaderProps extends ResumeSectionProps {
  position?: "left" | "center" | "right";
}

export function PersonalInfoHeader({
  resumeData,
  position = "center", // default alignment is center
}: PersonalInfoHeaderProps) {
  const {
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    phone,
    email,
    colorHex,
  } = resumeData;

  return (
    <div
      className={cn("flex items-center gap-6 p-4", {
        "justify-start": position === "left",
        "justify-center": position === "center",
        "justify-end": position === "right",
      })}
    >
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

export function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary, colorHex } = resumeData;

  if (!summary) return null;
  return (
    <>
      <hr
        className="border-1"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="break-inside-avoid space-y-3 p-1">
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

export function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences, colorHex } = resumeData;

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
      <div className="space-y-3 p-1">
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

export function EducationSection({ resumeData }: ResumeSectionProps) {
  const { educations, colorHex } = resumeData;

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
      <div className="space-y-3 p-1">
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
export function LanguagesSection({ resumeData }: ResumeSectionProps) {
  const { languages, colorHex, borderStyle } = resumeData;

  if (!languages?.length) return null;

  return (
    <>
      <hr
        className="border-1"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="break-inside-avoid space-y-3 p-1">
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
export function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills, colorHex, borderStyle } = resumeData;

  if (!skills?.length) return null;

  return (
    <>
      <hr
        className="border-1"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="break-inside-avoid space-y-3 p-1">
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
export function ReferenceSection({ resumeData }: ResumeSectionProps) {
  const { references, colorHex } = resumeData;

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
      <div className="space-y-3 p-1">
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
