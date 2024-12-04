import { EditorFormProps } from "@/lib/types";
import EducationForm from "./forms/EducationForm";
import GeneralInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import SkillsForm from "./forms/SkillsForm";
import LanguagesForm from "./forms/LanguageProfeincyForm";
import SummaryForm from "./forms/SummaryForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import ReferenceForm from "./forms/ReferenceForm";

export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  { title: "General info", component: GeneralInfoForm, key: "general-info" },
  { title: "Personal info", component: PersonalInfoForm, key: "personal-info" },
  {
    title: "Work experience",
    component: WorkExperienceForm,
    key: "work-experience",
  },
  { title: "Education", component: EducationForm, key: "education" },
  { title: "Languages", component: LanguagesForm, key: "language" },
  { title: "Skills", component: SkillsForm, key: "skills" },
  {
    title: "Summary",
    component: SummaryForm,
    key: "summary",
  },
  { title: "Reference", component: ReferenceForm, key: "reference" },
];
