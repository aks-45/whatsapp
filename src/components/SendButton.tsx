import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SendButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
}

const SendButton = ({ onClick, isLoading, disabled }: SendButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="w-full healthcare-button bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base gap-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin-slow" />
          Sending Messages...
        </>
      ) : (
        <>
          <Send className="w-5 h-5" />
          Send WhatsApp Messages
        </>
      )}
    </Button>
  );
};

export default SendButton;
