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
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Languages Profiency</h2>
        <p className="text-sm text-muted-foreground">
          Describe the languages you can speak?
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="languages"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Languages proficiency</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="e.g. Swahili,English, ..."
                    onChange={(e) => {
                      const languages = e.target.value.split(",");
                      field.onChange(languages);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Separate each language with a comma.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
