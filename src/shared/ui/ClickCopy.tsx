import { addToast, Button } from "@heroui/react";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

type ClickToCopyProps = {
  text: string;
  label?: string;
  className?: string;
};

export function ClickToCopy({ text, label, className }: ClickToCopyProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      addToast({
        title: "Error",
        description: "Failed to copy",
        color: "danger",
        timeout: 3000,
      });
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {label && <span className="text-sm font-medium">{label}</span>}
      <Button
        size="sm"
        variant="ghost"
        onPress={handleCopy}
        aria-label={isCopied ? "Copied!" : "Copy to clipboard"}
      >
        {isCopied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
