import type React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Class } from "../../types"

interface ClassSectionSelectorProps {
  classes: Class[]
  selectedClass: string | null
  selectedSection: string | null
  onClassChange: (classId: string) => void
  onSectionChange: (sectionId: string) => void
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
      <Select onValueChange={onClassChange} value={selectedClass || undefined}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select a class" />
        </SelectTrigger>
        <SelectContent>
          {classes.map((c) => (
            <SelectItem key={c.id} value={c.id}>
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedClass && (
        <Select onValueChange={onSectionChange} value={selectedSection || undefined}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a section" />
          </SelectTrigger>
          <SelectContent>
            {classes
              .find((c) => c.id === selectedClass)
              ?.sections.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      )}
    </div>
  )
}

