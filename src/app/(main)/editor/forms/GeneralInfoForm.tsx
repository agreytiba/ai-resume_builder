import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/lib/types";
import { generalInfoSchema, GeneralInfoValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function GeneralInfoForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const searchParams = useSearchParams();
  const templateNo = parseInt(searchParams.get("template") ?? "1", 10);

  const form = useForm<GeneralInfoValues>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      title: resumeData.title || "",
      description: resumeData.description || "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({ ...resumeData, ...values, templateNo });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData, templateNo]);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">General Information</h2>
        <p className="text-sm text-muted-foreground">
          Fill out the information below to customize your resume. This
          information will not be visible on your final resume.
        </p>
      </div>
      <Form {...form}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resume Name</FormLabel>
                <FormDescription>
                  Give your resume a unique name to help you identify it later.
                  For example: <em>&quot;Job Application 2024&quot;</em>.
                </FormDescription>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., My Dream Job Resume"
                    autoFocus
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purpose of the Resume</FormLabel>
                <FormDescription>
                  Briefly describe what this resume is for. For example:{" "}
                  <em>&quot;Applying for a software developer role.&quot;</em>
                </FormDescription>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., Resume for my next job in software development"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-center">
            <button type="button" className="btn btn-primary">
              Click The &quot;NEXT STEP&quot; to continue
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}
