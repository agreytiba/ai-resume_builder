import {
  PersonalInfoHeader,
  SummarySection,
  WorkExperienceSection,
  EducationSection,
  SkillsSection,
  LanguagesSection,
  ReferenceSection,
} from "@/components/ResumePreview";
import { ResumePreviewProps } from "@/lib/types";

export default function ResumePreviewTemplate4({
  resumeData,
  currentStep,
}: ResumePreviewProps) {
  return (
    <div className="space-y-4 p-6">
      <div className="text-center">
        <PersonalInfoHeader resumeData={resumeData} currentStep={currentStep} />
      </div>
      <SummarySection resumeData={resumeData} currentStep={currentStep} />
      <WorkExperienceSection
        resumeData={resumeData}
        currentStep={currentStep}
      />
      <EducationSection resumeData={resumeData} currentStep={currentStep} />
      <SkillsSection resumeData={resumeData} currentStep={currentStep} />
      <LanguagesSection resumeData={resumeData} currentStep={currentStep} />
      <ReferenceSection resumeData={resumeData} currentStep={currentStep} />
    </div>
  );
}
