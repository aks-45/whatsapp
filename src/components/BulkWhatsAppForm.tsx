import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import PhoneNumbersInput from "./PhoneNumbersInput";
import MessageInput from "./MessageInput";
import SendButton from "./SendButton";
import { Heart } from "lucide-react";

const BulkWhatsAppForm = () => {
  const [phoneNumbers, setPhoneNumbers] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Parse and validate phone numbers
  const parsePhoneNumbers = useCallback((input: string): string[] => {
    return input
      .split(/[,\n]+/)
      .map((num) => num.trim())
      .filter((num) => num.length > 0);
  }, []);

  const validatePhoneNumber = useCallback((phone: string): boolean => {
    // Basic validation: starts with + and has 10-15 digits
    const cleaned = phone.replace(/[\s\-()]/g, "");
    return /^\+?[1-9]\d{9,14}$/.test(cleaned);
  }, []);

  const numbers = parsePhoneNumbers(phoneNumbers);
  const validNumbers = numbers.filter(validatePhoneNumber);
  const invalidNumbers = numbers.filter((n) => !validatePhoneNumber(n));

  const canSend =
    validNumbers.length > 0 && message.trim().length > 0 && message.length <= 1000;

  const handleSend = async () => {
    if (!canSend) return;

    setIsLoading(true);

    try {
      const cleanNumbers = validNumbers.map(phone => 
        phone.replace(/[\s\-()]/g, "").replace(/^\+/, "")
      );

      const response = await fetch('https://whatsapp-xqfw.onrender.com/api/send-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          phoneNumbers: cleanNumbers
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        const successCount = result.results.filter(r => r.success).length;
        const failCount = result.results.filter(r => !r.success).length;
        
        toast({
          title: "Messages Sent! 🎉",
          description: `Successfully sent ${successCount} messages${failCount > 0 ? `, ${failCount} failed` : ''}`,
        });
        
        // Clear form on success
        setPhoneNumbers("");
        setMessage("");
      } else {
        throw new Error(result.error || 'Failed to send messages');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="healthcare-card space-y-6">
        {/* Card Header */}
        <div className="text-center pb-4 border-b border-border">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary mb-3">
            <Heart className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">
            Bulk Message Sender
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Send personalized WhatsApp messages to multiple patients
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <PhoneNumbersInput
            value={phoneNumbers}
            onChange={setPhoneNumbers}
            invalidNumbers={invalidNumbers}
            validCount={validNumbers.length}
          />

          <MessageInput value={message} onChange={setMessage} />

          <SendButton
            onClick={handleSend}
            isLoading={isLoading}
            disabled={!canSend}
          />
        </div>

        {/* Footer Note */}
        <p className="text-xs text-center text-muted-foreground pt-2">
          Messages will be sent directly via WhatsApp Business API
        </p>
      </div>
    </div>
  );
};

export default BulkWhatsAppForm;
