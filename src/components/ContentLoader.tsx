import { Loader2 } from "lucide-react";

export default function ContentLoader() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <Loader2 className="mx-auto h-10 w-10 animate-spin text-gray-500" />
        <p className="mt-2 text-lg font-medium text-gray-600">Loading</p>
      </div>
    </div>
  );
}
