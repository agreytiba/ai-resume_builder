"use client";

import { ResumeValues } from "@/lib/validation";
import ResumePreviewTemplate1 from "./templates/list/template1";
import ResumePreviewTemplate2 from "./templates/list/template2";
import ResumePreviewTemplate3 from "./templates/list/template3";
import ResumePreviewTemplate4 from "./templates/list/template4";

interface TemplateSelectorProps extends ResumeValues {
  resumeData: ResumeValues;
  template: string;
  currentStep?: string;
}

export default function TemplateSelector({
  resumeData,
  currentStep,
  template,
}: TemplateSelectorProps) {
  const resumeTemplate = parseInt(template, 10);
  switch (resumeTemplate) {
    case 1:
      return (
        <ResumePreviewTemplate1
          resumeData={resumeData}
          currentStep={currentStep}
        />
      );
    case 2:
      return (
        <ResumePreviewTemplate2
          resumeData={resumeData}
          currentStep={currentStep}
        />
      );
    case 3:
      return (
        <ResumePreviewTemplate3
          resumeData={resumeData}
          currentStep={currentStep}
        />
      );
    case 4:
      return (
        <ResumePreviewTemplate4
          resumeData={resumeData}
          currentStep={currentStep}
        />
      );
    case 5:
      return (
        <ResumePreviewTemplate1
          resumeData={resumeData}
          currentStep={currentStep}
        />
      );
    default:
      return (
        <ResumePreviewTemplate1
          resumeData={resumeData}
          currentStep={currentStep}
        />
      );
  }
}
