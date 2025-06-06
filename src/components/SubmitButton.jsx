import { Button } from "@/components/ui/button";

export function SubmitButton({ label, isLoading = false }) {
  return (
    <Button type="submit" disabled={isLoading}>
      {isLoading ? "Loading..." : label}
    </Button>
  );
}
