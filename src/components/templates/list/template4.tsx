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
      <PersonalInfoHeader resumeData={resumeData} currentStep={currentStep} />
      <SummarySection resumeData={resumeData} currentStep={currentStep} />
      <hr />
      <WorkExperienceSection
        resumeData={resumeData}
        currentStep={currentStep}
      />
      <hr />
      <EducationSection resumeData={resumeData} currentStep={currentStep} />
      <hr />
      <SkillsSection resumeData={resumeData} currentStep={currentStep} />
      <LanguagesSection resumeData={resumeData} currentStep={currentStep} />
      <hr />
      <ReferenceSection resumeData={resumeData} currentStep={currentStep} />
    </div>
  );
}
