import { Phone, AlertCircle, CheckCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface PhoneNumbersInputProps {
  value: string;
  onChange: (value: string) => void;
  invalidNumbers: string[];
  validCount: number;
}

const PhoneNumbersInput = ({
  value,
  onChange,
  invalidNumbers,
  validCount,
}: PhoneNumbersInputProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label
          htmlFor="phone-numbers"
          className="text-sm font-semibold text-foreground flex items-center gap-2"
        >
          <Phone className="w-4 h-4 text-primary" />
          Enter Phone Numbers
        </Label>
        {validCount > 0 && (
          <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-accent" />
            {validCount} valid
          </span>
        )}
      </div>

      <Textarea
        id="phone-numbers"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`+919876543210\n+919812345678`}
        className="healthcare-input min-h-[140px] resize-none text-sm font-mono"
        aria-describedby="phone-helper"
      />

      <p id="phone-helper" className="text-xs text-muted-foreground flex items-center gap-1">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary"></span>
        Enter numbers with country code, separated by comma or new line
      </p>

      {invalidNumbers.length > 0 && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3 space-y-1">
          <p className="text-xs font-medium text-destructive flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            Invalid phone numbers detected:
          </p>
          <p className="text-xs text-destructive/80 font-mono break-all">
            {invalidNumbers.slice(0, 5).join(", ")}
            {invalidNumbers.length > 5 && ` +${invalidNumbers.length - 5} more`}
          </p>
        </div>
      )}
    </div>
  );
};

export default PhoneNumbersInput;
