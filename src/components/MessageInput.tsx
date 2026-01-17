import { MessageCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

const MessageInput = ({ value, onChange, maxLength = 1000 }: MessageInputProps) => {
  const charCount = value.length;
  const isNearLimit = charCount > maxLength * 0.9;
  const isOverLimit = charCount > maxLength;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label
          htmlFor="message"
          className="text-sm font-semibold text-foreground flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4 text-primary" />
          Message
        </Label>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full transition-colors ${
            isOverLimit
              ? "bg-destructive/10 text-destructive"
              : isNearLimit
              ? "bg-accent/10 text-accent"
              : "bg-secondary text-muted-foreground"
          }`}
        >
          {charCount}/{maxLength}
        </span>
      </div>

      <Textarea
        id="message"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your message here... 💊

You can use emojis and line breaks!"
        className="healthcare-input min-h-[160px] resize-none text-sm leading-relaxed"
      />

      <p className="text-xs text-muted-foreground flex items-center gap-1">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent"></span>
        Emojis and line breaks are supported
      </p>
    </div>
  );
};

export default MessageInput;
