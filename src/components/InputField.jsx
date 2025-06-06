import { Input } from "./ui/input";
import { Label } from "@/components/ui/label";

export function InputField({ id, label, type = "text", value, onChange }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} value={value} onChange={onChange} required />
    </div>
  );
}
