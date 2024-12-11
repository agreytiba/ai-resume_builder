import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { steps } from "./steps";
import { ResumeValues } from "@/lib/validation";
import { useRouter } from "next/navigation"; // Import router if using Next.js
interface FooterProps {
  title?: string;
  currentStep: string;
  setCurrentStep: (step: string) => void;
  showSmResumePreview: boolean;
  setShowSmResumePreview: (show: boolean) => void;
  isSaving: boolean;
  resumeData: ResumeValues;
}

export default function Footer({
  currentStep,
  setCurrentStep,
  showSmResumePreview,
  setShowSmResumePreview,
  isSaving,
  resumeData,
}: FooterProps) {
  const router = useRouter();
  console.log(resumeData);
  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep,
  )?.key;

  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep,
  )?.key;

  const handleDownload = () => {
    router.push(`/print?resumeId=${resumeData.id}`); // Use string path with encoded query
  };

  return (
    <footer className="w-full border-t bg-gray-100 px-3 py-3">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            onClick={
              previousStep ? () => setCurrentStep(previousStep) : undefined
            }
            disabled={!previousStep}
            style={{
              background: `blue`,
            }}
          >
            Previous step
          </Button>
          <Button
            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
            disabled={!nextStep}
          >
            Next step
          </Button>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowSmResumePreview(!showSmResumePreview)}
          className="w-42 md:hidden"
          title={
            showSmResumePreview ? "Show input form" : "Show resume preview"
          }
        >
          {showSmResumePreview ? (
            <span className="rounded bg-yellow-500 p-2 text-white">forms</span>
          ) : (
            <span className="rounded bg-green-500 p-2">VIEW CV</span>
          )}
        </Button>
        <div className="flex items-center gap-3">
          {currentStep === "reference" && (
            <Button className="bg-black" onClick={handleDownload}>
              Download
            </Button>
          )}

          <div
            className={cn(
              "text-black opacity-0",
              isSaving && "bg-green opacity-100",
            )}
          >
            <Button className="">
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-gray-500" />
              Saving...
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}


