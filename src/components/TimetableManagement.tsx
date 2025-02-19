"use client"

import type React from "react"
import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { LogOut, Save } from "lucide-react"
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
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [isManagingClasses, setIsManagingClasses] = useState(false)
  const [selectedCell, setSelectedCell] = useState<TimeTableEntry | null>(null)
  const [editingTimeSlot, setEditingTimeSlot] = useState<TimeSlot | null>(null)
  const [isManagingTimeSlots, setIsManagingTimeSlots] = useState(false)
  const [isManagingTeachersSubjects, setIsManagingTeachersSubjects] = useState(false)
  const [teacherChangeError, setTeacherChangeError] = useState<string | null>(null)

  const { classes, addClass, updateClass, deleteClass, addSection, updateSection, deleteSection, fetchClasses } =
    useClasses()
  const { teachers, addTeacher, updateTeacher, deleteTeacher, fetchTeachers } = useTeachers()
  const { subjects, addSubject, updateSubject, deleteSubject, fetchSubjects } = useSubjects()
  const { timeSlots, addTimeSlot, updateTimeSlot, deleteTimeSlot, fetchTimeSlots } = useTimeSlots()
  const { timeTable, fetchTimetable, initializeTimeTable, updateTeacherInTimeTable } = useTimetable()

  useEffect(() => {
    fetchClasses()
    fetchTeachers()
    fetchSubjects()
    fetchTimeSlots()
  }, [fetchClasses, fetchTeachers, fetchSubjects, fetchTimeSlots])

  const handleClassChange = useCallback((classId: string) => {
    setSelectedClass(classId)
    setSelectedSection(null)
  }, [])

  const handleSectionChange = useCallback(
    (sectionId: string) => {
      setSelectedSection(sectionId)
      if (selectedClass !== null) {
        initializeTimeTable(selectedClass, sectionId, days, timeSlots)
      }
    },
    [selectedClass, initializeTimeTable, timeSlots],
  )

  const handleCellClick = useCallback((entry: TimeTableEntry) => {
    setSelectedCell(entry)
  }, [])

  const handleTeacherChange = useCallback(
    async (newTeacherId: string) => {
      if (selectedCell && selectedClass !== null && selectedSection !== null) {
        const teacher = teachers.find((t) => t.id === newTeacherId)
        if (!teacher) {
          console.error("Teacher not found")
          return
        }

        try {
          await updateTeacherInTimeTable(
            newTeacherId,
            teacher.subject_id,
            selectedCell.class_id,
            selectedCell.section_id,
            selectedCell.time_slot_id,
            selectedCell.day_id,
          )
          setSelectedCell(null)
          toast({
            title: "Teacher Updated",
            description: "The teacher has been successfully assigned to this time slot.",
          })
        } catch (error) {
          console.error("Error updating teacher:", error)
          toast({
            title: "Error",
            description: "An error occurred while updating the teacher.",
            variant: "destructive",
          })
        }
      }
    },
    [selectedCell, selectedClass, selectedSection, teachers, updateTeacherInTimeTable, toast],
  )

  const handleSaveTimetable = useCallback(async () => {
    if (selectedClass && selectedSection) {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) return

        const { error } = await supabase.from("timetableentries").upsert(
          timeTable.map((entry) => ({
            ...entry,
            user_id: user.id,
            class_id: selectedClass,
            section_id: selectedSection,
          })),
          { onConflict: "user_id,class_id,section_id,day_id,time_slot_id" },
        )

        if (error) {
          console.error("Error saving timetable:", error)
          toast({
            title: "Error",
            description: "An error occurred while saving the timetable.",
            variant: "destructive",
          })
        } else {
          toast({
            title: "Timetable Saved",
            description: "The timetable has been successfully saved.",
          })
        }
      } catch (error) {
        console.error("Error saving timetable:", error)
        toast({
          title: "Error",
          description: "An error occurred while saving the timetable.",
          variant: "destructive",
        })
      }
    }
  }, [selectedClass, selectedSection, timeTable, supabase, toast])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Timetable Management System</h1>
        <div className="flex items-center space-x-4">
          <Button onClick={handleSaveTimetable} variant="outline">
            <Save className="mr-2 h-4 w-4" /> Save Timetable
          </Button>
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
            <Select onValueChange={(value) => handleTeacherChange(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a teacher" />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id}>
                    {`${teacher.name} (${subjects.find((s) => s.id === teacher.subject_id)?.name})`}
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
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

