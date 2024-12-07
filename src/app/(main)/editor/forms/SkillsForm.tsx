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
import { skillsSchema, SkillsValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SkillsForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<SkillsValues>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: resumeData.skills || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        skills:
          values.skills
            ?.filter((skill) => skill !== undefined)
            .map((skill) => skill.trim())
            .filter((skill) => skill !== "") || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Your Skills</h2>
        <p className="text-sm text-muted-foreground">
          Let us know the skills you&apos;re proficient in or experienced with.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                {/* Hidden label for accessibility */}
                <FormLabel className="sr-only">Skills</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={`Example: "React.js, Node.js, Graphic Design, Communication"`}
                    onChange={(e) => {
                      const skills = e.target.value.split(",");
                      field.onChange(skills);
                    }}
                    autoFocus
                  />
                </FormControl>
                {/* Instructions under the field */}
                <FormDescription>
                  Separate each skill with a comma.
                  <span className="text-yellow-500">
                    Example: React.js, Node.js, Graphic Design.
                  </span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Additional Guidance for Non-technical Users */}
          <div className="mt-2 text-sm">
            <p className="text-yellow-500">Tips</p>
            <div className="space-y-2 border-2 bg-gray-100 p-1">
              <p>
                {" "}
                1 Think about skills you use in work, hobbies, or education.
              </p>
              <p>
                2 Examples: Programming (Python, JavaScript), Graphic Design,
                Communication, Problem-Solving.
              </p>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
