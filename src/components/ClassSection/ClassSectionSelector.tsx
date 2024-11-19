import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Class } from "../../types";

interface ClassSectionSelectorProps {
  classes: Class[];
  selectedClass: number | null;
  selectedSection: number | null;
  onClassChange: (classId: string) => void;
  onSectionChange: (sectionId: string) => void;
}

export const ClassSectionSelector: React.FC<ClassSectionSelectorProps> = ({
  classes,
  selectedClass,
  selectedSection,
  onClassChange,
  onSectionChange,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Select onValueChange={onClassChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select a class" />
        </SelectTrigger>
        <SelectContent>
          {classes.map((c) => (
            <SelectItem key={c.id} value={c.id.toString()}>
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedClass && (
        <Select
          onValueChange={onSectionChange}
          value={selectedSection?.toString() || ""}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a section" />
          </SelectTrigger>
          <SelectContent>
            {classes
              .find((c) => c.id === selectedClass)
              ?.sections.map((s) => (
                <SelectItem key={s.id} value={s.id.toString()}>
                  {s.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};
