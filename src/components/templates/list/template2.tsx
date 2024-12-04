import {
  PersonalInfoHeader,
  SummarySection,
  LanguagesSection,
  SkillsSection,
  ReferenceSection,
  WorkExperienceSection,
  EducationSection,
} from "@/components/ResumePreview";

import { ResumeValues } from "@/lib/validation";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
  currentStep?: string;
}

export default function ResumePreviewTemplate2({
  resumeData,
  currentStep,
}: ResumePreviewProps) {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-start gap-6">
        <PersonalInfoHeader resumeData={resumeData} currentStep={currentStep} />
        <SummarySection resumeData={resumeData} currentStep={currentStep} />
      </div>
      <hr />

      <div className="space-y-4">
        <WorkExperienceSection
          resumeData={resumeData}
          currentStep={currentStep}
        />
        <EducationSection resumeData={resumeData} currentStep={currentStep} />
      </div>
      <hr />
      <div className="flex items-center justify-between space-y-4">
        <LanguagesSection resumeData={resumeData} currentStep={currentStep} />
        <SkillsSection resumeData={resumeData} currentStep={currentStep} />
      </div>
      <hr />
      <div className="space-y-4">
        <ReferenceSection resumeData={resumeData} currentStep={currentStep} />
      </div>
    </div>
  );
}
