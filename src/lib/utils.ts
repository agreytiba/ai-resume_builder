import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ResumeServerData } from "./types";
import { ResumeValues } from "./validation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fileReplacer(key: unknown, value: unknown) {
  return value instanceof File
    ? {
        name: value.name,
        size: value.size,
        type: value.type,
        lastModified: value.lastModified,
      }
    : value;
}

export function mapToResumeValues(data: ResumeServerData): ResumeValues {
  return {
    id: data.id,
    templateNo: data.templateNo ?? 0,
    title: data.title || undefined,
    description: data.description || undefined,
    photo: data.photoUrl || undefined,
    firstName: data.firstName || undefined,
    lastName: data.lastName || undefined,
    middleName: data.middleName || undefined,
    jobTitle: data.jobTitle || undefined,
    city: data.city || undefined,
    country: data.country || undefined,
    phone: data.phone || undefined,
    email: data.email || undefined,
    workExperiences: (data.workExperiences || []).map((exp) => ({
      position: exp.position || undefined,
      company: exp.company || undefined,
      startDate: exp.startDate
        ? new Date(exp.startDate).toISOString().split("T")[0]
        : undefined,
      endDate: exp.endDate
        ? new Date(exp.endDate).toISOString().split("T")[0]
        : undefined,
      description: exp.description || undefined,
    })),
    educations: (data.educations || []).map((edu) => ({
      degree: edu.degree || undefined,
      school: edu.school || undefined,
      startDate: edu.startDate
        ? new Date(edu.startDate).toISOString().split("T")[0]
        : undefined,
      endDate: edu.endDate
        ? new Date(edu.endDate).toISOString().split("T")[0]
        : undefined,
    })),
    references: (data.references || []).map((ref) => ({
      referenceFirstName: ref.referenceFirstName || undefined,
      referenceLastName: ref.referenceLastName || undefined,
      referenceJobTitle: ref.referenceJobTitle || undefined,
      referenceCompanyName: ref.referenceCompanyName || undefined,
      referenceAddress: ref.referenceAddress || undefined,
      referencePhone: ref.referencePhone || undefined,
      referenceDescription: ref.referenceDescription || undefined,
      referenceEmail: ref.referenceEmail || undefined,
    })),
    skills: data.skills || [],
    languages: data.languages || [],
    borderStyle: data.borderStyle || "squircle",
    colorHex: data.colorHex || "#000000",
    summary: data.summary || undefined,
    request_order_id: data.request_order_id || undefined,
    paid_order_id: data.paid_order_id || undefined,
    isDownloaded: data.isDownloaded ?? false,
    Payment_status: data.Payment_status ?? false,
    enable_edit: data.enable_edit ?? false,
  };
}

