import {
  EducationSection,
  LanguagesSection,
  PersonalInfoHeader,
  ReferenceSection,
  SkillsSection,
  SummarySection,
  WorkExperienceSection,
} from "@/components/ResumePreview";
import { ResumeValues } from "@/lib/validation";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
  currentStep?: string;
}

export default function ResumePreviewTemplate7({
  resumeData,
  currentStep,
}: ResumePreviewProps) {
  return (
    <div className="grid grid-cols-12 gap-6 p-6">
      {/* Left Column */}
      <div className="col-span-4 space-y-4 rounded-lg bg-blue-100 p-4">
        <PersonalInfoHeader resumeData={resumeData} currentStep={currentStep} />
        <LanguagesSection resumeData={resumeData} currentStep={currentStep} />
        <SkillsSection
          resumeData={resumeData}
          currentStep={currentStep}
          listAlignment="column"
        />
      </div>

      {/* Right Column */}
      <div className="col-span-8 space-y-6">
        <SummarySection resumeData={resumeData} currentStep={currentStep} />
        <WorkExperienceSection
          resumeData={resumeData}
          currentStep={currentStep}
        />
        <EducationSection resumeData={resumeData} currentStep={currentStep} />
        <ReferenceSection resumeData={resumeData} currentStep={currentStep} />
      </div>
    </div>
  );
}
