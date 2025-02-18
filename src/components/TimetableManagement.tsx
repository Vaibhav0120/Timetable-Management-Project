"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Save, LogOut } from "lucide-react"
import { ClassSectionSelector } from "./ClassSection/ClassSectionSelector"
import { ClassSectionManager } from "./ClassSection/ClassSectionManager"
import { TeacherSubjectManager } from "./TeacherSubject/TeacherSubjectManager"
import { TimeSlotManager } from "./TimeSlot/TimeSlotManager"
import { TimeSlotEditor } from "./TimeSlot/TimeSlotEditor"
import { TimetableGrid } from "./Timetable/TimetableGrid"
import { useClasses } from "../hooks/useClasses"
import { useTeachers } from "../hooks/useTeachers"
import { useSubjects } from "../hooks/useSubjects"
import { useTimeSlots } from "../hooks/useTimeSlots"
import { useTimetable } from "../hooks/useTimetable"
import { checkConflictsAcrossTimeTables } from "../utils/helpers"
import type { TimeTableEntry, TimeSlot, Day } from "../types"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const days: Day[] = [
  { id: 1, name: "Monday" },
  { id: 2, name: "Tuesday" },
  { id: 3, name: "Wednesday" },
  { id: 4, name: "Thursday" },
  { id: 5, name: "Friday" },
]

export const TimetableManagement: React.FC = () => {
  const { toast } = useToast()
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [selectedClass, setSelectedClass] = useState<number | null>(null)
  const [selectedSection, setSelectedSection] = useState<number | null>(null)
  const [isManagingClasses, setIsManagingClasses] = useState(false)
  const [selectedCell, setSelectedCell] = useState<TimeTableEntry | null>(null)
  const [editingTimeSlot, setEditingTimeSlot] = useState<TimeSlot | null>(null)
  const [saveStatus, setSaveStatus] = useState<"Saved" | "Not Saved" | "Error">("Saved")
  const [isManagingTimeSlots, setIsManagingTimeSlots] = useState(false)
  const [isManagingTeachersSubjects, setIsManagingTeachersSubjects] = useState(false)
  const [teacherChangeError, setTeacherChangeError] = useState<string | null>(null)

  const { classes, addClass, updateClass, deleteClass, addSection, updateSection, deleteSection } = useClasses()
  const { teachers, addTeacher, updateTeacher, deleteTeacher } = useTeachers()
  const { subjects, addSubject, updateSubject, deleteSubject } = useSubjects()
  const { timeSlots, addTimeSlot, updateTimeSlot, deleteTimeSlot } = useTimeSlots()
  const { timeTable, savedTimeTables, initializeTimeTable, updateTeacherInTimeTable, saveTimetable } = useTimetable()

  const handleClassChange = useCallback(
    (classId: string) => {
      const newClassId = Number(classId)
      setSelectedClass(newClassId)
      setSelectedSection(null)
      initializeTimeTable(newClassId, null, days, timeSlots)
    },
    [initializeTimeTable, timeSlots],
  )

  const handleSectionChange = useCallback(
    (sectionId: string) => {
      const newSectionId = Number(sectionId)
      setSelectedSection(newSectionId)
      if (selectedClass !== null) {
        initializeTimeTable(selectedClass, newSectionId, days, timeSlots)
      }
    },
    [selectedClass, initializeTimeTable, timeSlots],
  )

  const handleCellClick = useCallback((entry: TimeTableEntry) => {
    setSelectedCell(entry)
  }, [])

  const handleTeacherChange = useCallback(
    (newTeacherId: number) => {
      if (selectedCell && selectedClass !== null && selectedSection !== null) {
        const conflict = checkConflictsAcrossTimeTables(
          newTeacherId,
          selectedCell.timeSlotId,
          selectedCell.dayId,
          selectedClass,
          selectedSection,
          savedTimeTables,
        )

        if (conflict) {
          const conflictingTeacher = teachers.find((t) => t.id === newTeacherId)
          const errorMessage = `${conflictingTeacher?.name} is already assigned to another class in this time slot.`
          setTeacherChangeError(errorMessage)
          toast({
            title: "Conflict Detected",
            description: errorMessage,
            variant: "destructive",
          })
        } else {
          setTeacherChangeError(null)
          updateTeacherInTimeTable(
            newTeacherId,
            selectedCell.classId,
            selectedCell.sectionId,
            selectedCell.timeSlotId,
            selectedCell.dayId,
          )
          setSelectedCell(null)
          setSaveStatus("Not Saved")
        }
      }
    },
    [selectedCell, selectedClass, selectedSection, savedTimeTables, teachers, updateTeacherInTimeTable, toast],
  )

  const handleSaveTimetable = useCallback(() => {
    if (selectedClass !== null && selectedSection !== null) {
      saveTimetable(selectedClass, selectedSection)
      setSaveStatus("Saved")
      toast({
        title: "Timetable Saved",
        description: `Timetable for ${classes.find((c) => c.id === selectedClass)?.name} - ${classes.find((c) => c.id === selectedClass)?.sections.find((s) => s.id === selectedSection)?.name} has been saved successfully.`,
      })
    }
  }, [selectedClass, selectedSection, classes, saveTimetable, toast])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Timetable Management System</h1>
        <div className="flex items-center space-x-4">
          {selectedClass && selectedSection && (
            <div
              className={`${
                saveStatus === "Saved"
                  ? "text-green-500"
                  : saveStatus === "Not Saved"
                    ? "text-gray-500"
                    : "text-red-500"
              }`}
            >
              {saveStatus}
            </div>
          )}
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </div>
      <div className="mb-4 flex items-center space-x-2">
        <ClassSectionSelector
          classes={classes}
          selectedClass={selectedClass}
          selectedSection={selectedSection}
          onClassChange={handleClassChange}
          onSectionChange={handleSectionChange}
        />
        <Button onClick={() => setIsManagingClasses(true)}>Manage Classes</Button>
        <Button onClick={handleSaveTimetable} disabled={!selectedClass || !selectedSection}>
          <Save className="mr-2 h-4 w-4" /> Save Timetable
        </Button>
      </div>
      {selectedClass && selectedSection && (
        <TimetableGrid
          timeTable={timeTable}
          days={days}
          timeSlots={timeSlots}
          teachers={teachers}
          subjects={subjects}
          onCellClick={handleCellClick}
        />
      )}
      {selectedClass && selectedSection && (
        <div className="mt-4 flex space-x-2">
          <Button onClick={() => setIsManagingTeachersSubjects(true)}>Manage Teachers and Subjects</Button>
          <Button onClick={() => setIsManagingTimeSlots(true)}>Edit Time Slots</Button>
        </div>
      )}
      <Dialog
        open={!!selectedCell}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedCell(null)
            setTeacherChangeError(null)
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Teacher</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="teacher">Select Teacher</Label>
            <Select onValueChange={(value) => handleTeacherChange(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select a teacher" />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id.toString()}>
                    {`${teacher.name} (${subjects.find((s) => s.id === teacher.subjectId)?.name})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {teacherChangeError && <p className="text-red-500 text-sm mt-2">{teacherChangeError}</p>}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isManagingClasses} onOpenChange={setIsManagingClasses}>
        <DialogContent className="max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Manage Classes and Sections</DialogTitle>
          </DialogHeader>
          <div className="flex-grow overflow-y-auto pr-6">
            <ClassSectionManager
              classes={classes}
              addClass={addClass}
              updateClass={updateClass}
              deleteClass={deleteClass}
              addSection={addSection}
              updateSection={updateSection}
              deleteSection={deleteSection}
            />
          </div>
        </DialogContent>
      </Dialog>
      <TimeSlotEditor timeSlot={editingTimeSlot} onUpdate={updateTimeSlot} onClose={() => setEditingTimeSlot(null)} />
      <Dialog open={isManagingTimeSlots} onOpenChange={setIsManagingTimeSlots}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Manage Time Slots</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <TimeSlotManager
              timeSlots={timeSlots}
              addTimeSlot={addTimeSlot}
              updateTimeSlot={updateTimeSlot}
              deleteTimeSlot={deleteTimeSlot}
            />
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isManagingTeachersSubjects} onOpenChange={setIsManagingTeachersSubjects}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Manage Teachers and Subjects</DialogTitle>
          </DialogHeader>
          <div className="flex-grow overflow-y-auto pr-6">
            <TeacherSubjectManager
              teachers={teachers}
              subjects={subjects}
              addTeacher={addTeacher}
              updateTeacher={updateTeacher}
              deleteTeacher={deleteTeacher}
              addSubject={addSubject}
              updateSubject={updateSubject}
              deleteSubject={deleteSubject}
              onTeacherSelect={() => {}}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

