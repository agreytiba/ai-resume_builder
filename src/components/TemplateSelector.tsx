"use client";

import { ResumeValues } from "@/lib/validation";
import ResumePreviewTemplate1 from "./templates/list/template1";
import ResumePreviewTemplate2 from "./templates/list/template2";
import ResumePreviewTemplate3 from "./templates/list/template3";
import ResumePreviewTemplate4 from "./templates/list/template4";
import ResumePreviewTemplate5 from "./templates/list/template5";
import ResumePreviewTemplate6 from "./templates/list/template6";
import ResumePreviewTemplate7 from "./templates/list/template7";
import ResumePreviewTemplate8 from "./templates/list/template8";
import ResumePreviewTemplate9 from "./templates/list/template9";

interface TemplateSelectorProps extends ResumeValues {
  resumeData: ResumeValues;
  currentStep?: string;
}

export default function TemplateSelector({
  resumeData,
  currentStep,
}: TemplateSelectorProps) {
  const resumeTemplate = resumeData.templateNo;
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
        <ResumePreviewTemplate5
          resumeData={resumeData}
          currentStep={currentStep}
        />
      );
    case 6:
      return (
        <ResumePreviewTemplate6
          resumeData={resumeData}
          currentStep={currentStep}
        />
      );
    case 7:
      return (
        <ResumePreviewTemplate7
          resumeData={resumeData}
          currentStep={currentStep}
        />
      );
    case 8:
      return (
        <ResumePreviewTemplate8
          resumeData={resumeData}
          currentStep={currentStep}
        />
      );
    case 9:
      return (
        <ResumePreviewTemplate9
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
