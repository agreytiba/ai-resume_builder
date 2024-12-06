import {
  PersonalInfoHeader,
  SummarySection,
  WorkExperienceSection,
  EducationSection,
  SkillsSection,
  LanguagesSection,
} from "@/components/ResumePreview";
import { ResumePreviewProps } from "@/lib/types";

export default function ResumePreviewTemplate9({
  resumeData,
  currentStep,
}: ResumePreviewProps) {
  return (
    <div className="grid grid-cols-1 gap-4 p-6">
      <div className="border p-4 text-center">
        <PersonalInfoHeader resumeData={resumeData} currentStep={currentStep} />
      </div>
      <div className="border p-4">
        <SummarySection resumeData={resumeData} currentStep={currentStep} />
      </div>
      <div className="border p-4">
        <WorkExperienceSection
          resumeData={resumeData}
          currentStep={currentStep}
        />
      </div>
      <div className="border p-4">
        <EducationSection resumeData={resumeData} currentStep={currentStep} />
      </div>
      <div className="border p-4">
        <SkillsSection resumeData={resumeData} currentStep={currentStep} />
        <LanguagesSection resumeData={resumeData} currentStep={currentStep} />
      </div>
    </div>
  );
}
