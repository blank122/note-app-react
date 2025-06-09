import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const Loading = ({ text = "Loading...", className = "" }) => {
  return (
    <div className={cn("flex items-center justify-center flex-col gap-2 p-4", className)}>
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
