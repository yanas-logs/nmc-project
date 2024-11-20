import { cn } from "@/lib/utils";
import { CheckIcon } from "@/utils/icons";

export default function WhatWillYouLearn({
  promises = [],
  className = "",
}: {
  promises: string[];
  className?: string;
}) {
  return (
    <div className={cn("border p-3", className)}>
      <h1 className="text-2xl font-semibold my-3">What you&apos;ll learn</h1>
      <div className="grid grid-cols-2 gap-4">
        {promises.map((p, idx) => (
          <div key={idx} className="flex gap-4 items-start">
            <CheckIcon className="text-xl mt-2" />
            <p>{p}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
