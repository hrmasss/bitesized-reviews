import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";

interface MultiInputsProps {
  label: string;
  addValue: (value: string) => void;
}

export default function MultiInputs({ label, addValue }: MultiInputsProps) {
  const [newValue, setNewValue] = useState("");

  const handleAddValue = () => {
    if (newValue.trim()) {
      addValue(newValue.trim());
      setNewValue("");
    }
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1 flex items-center gap-2">
        <Input
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder={`Add a ${label.toLowerCase()}`}
          maxLength={32}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleAddValue();
            }
          }}
        />
        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={handleAddValue}
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}
