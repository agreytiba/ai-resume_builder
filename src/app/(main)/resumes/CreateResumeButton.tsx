"use client";

import ContentLoader from "@/components/ContentLoader";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateResumeButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const premiumModal = usePremiumModal();
  // init navigation
  const router = useRouter();
  // handle show the editor
  const handleClick = () => {
    setIsLoading(true);
    router.push("/editor");
  };

  if (isLoading) {
    return <ContentLoader />;
  }
  return (
    <Button asChild className="mx-auto flex w-fit gap-2">
      <div onClick={handleClick}>
        <PlusSquare className="size-5" />
        New resume
      </div>
    </Button>
  );
}


