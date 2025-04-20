import { Button } from "../components/ui/button";

export default function AISuggest() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50 py-8 px-2 sm:px-4">
      <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">AI Product Suggestions</h1>
      {/* Gemini API integration here */}
      <Button>Get Suggestion</Button>
    </div>
  );
}
