"use client";

import { Button } from "@/components/ui/button";

export default function InstructorGlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="h-screen w-screen flex items-center md:justify-center flex-col p-3">
      <div className="p-4 border rounded w-full sm:max-w-sm">
        <h2 className="text-lg mb-2">Something went wrong!</h2>
        <p className="text-sm text-gray-500 mb-3">{error.message}</p>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  );
}
