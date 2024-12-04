import { Metadata } from "next";
import DisplayTemplate from "./DisplayTemplate";

export const metadata: Metadata = {
  title: "List of Templates",
};

export default async function ListOfTemplates() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <div className="space-y-1">
        <h1 className="text-center text-3xl font-bold">List of templates</h1>
      </div>
      <div className="grid w-full grid-cols-2 gap-3 bg-gray-200 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <DisplayTemplate template={1} />
        <DisplayTemplate template={2} />
        <DisplayTemplate template={3} />
        <DisplayTemplate template={4} />
        <DisplayTemplate template={5} />
        <DisplayTemplate template={6} />
        <DisplayTemplate template={7} />
        <DisplayTemplate template={8} />
      </div>
    </main>
  );
}
