import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { languageSchema, LanguagesValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function LangaugesForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<LanguagesValues>({
    resolver: zodResolver(languageSchema),
    defaultValues: {
      languages: resumeData.languages || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        languages:
          values.languages
            ?.filter((language) => language !== undefined)
            .map((language) => language.trim())
            .filter((language) => language !== "") || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-center text-2xl font-semibold">
          Languages Proficiency
        </h2>
        <p className="text-sm text-muted-foreground">
          add languages you can speak or understand.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="languages"
            render={({ field }) => (
              <FormItem>
                {/* Hidden label for better accessibility */}
                <FormLabel className="sr-only">Languages proficiency</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={`Example: "Swahili, English, Spanish"`}
                    onChange={(e) => {
                      const languages = e.target.value.split(",");
                      field.onChange(languages);
                    }}
                    autoFocus
                  />
                </FormControl>
                {/* Helpful description */}
                <FormDescription className="">
                  Separate each language you know with a comma{" "}
                  <span className="text-yellow-500">
                    {" "}
                    E.g., Swahili, English, Spanish.
                  </span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Additional Tip for Clarity */}
          <div className="mt-2 space-y-2 text-sm text-muted-foreground">
            <p className="text-yellow-500">Tips</p>
            <p>
              1 List all languages you can speak or understand, even if
              you&apos;re not fluent in all of them.
            </p>
            <p>
              2 Example: &quot;Swahili, English, Spanish&quot; or &quot;French
              (basic knowledge)&quot;.
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
