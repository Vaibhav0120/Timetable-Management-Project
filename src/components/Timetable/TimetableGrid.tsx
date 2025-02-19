import type React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { TimeTableEntry, Day, TimeSlot, Teacher, Subject } from "../../types"

interface TimetableGridProps {
  timeTable: TimeTableEntry[]
  days: Day[]
  timeSlots: TimeSlot[]
  teachers: Teacher[]
  subjects: Subject[]
  onCellClick: (entry: TimeTableEntry) => void
}

export const TimetableGrid: React.FC<TimetableGridProps> = ({
  timeTable,
  days,
  timeSlots,
  teachers,
  subjects,
  onCellClick,
}) => {
  const getTeacherAndSubject = (entry: TimeTableEntry) => {
    const teacher = teachers.find((t) => t.id === entry.teacher_id)
    const subject = subjects.find((s) => s.id === entry.subject_id)
    return teacher && subject ? `${teacher.name} (${subject.name})` : "Not assigned"
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-24">Time / Day</TableHead>
          {days.map((day) => (
            <TableHead key={day.id}>{day.name}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {timeSlots.map((slot) => (
          <TableRow key={slot.id}>
            <TableCell className="w-24">{`${slot.start_time} - ${slot.end_time}`}</TableCell>
            {days.map((day) => {
              const entry = timeTable.find((e) => e.time_slot_id === slot.id && e.day_id === day.id)
              return (
                <TableCell
                  key={`${slot.id}-${day.id}`}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => entry && onCellClick(entry)}
                >
                  {entry ? getTeacherAndSubject(entry) : "-"}
                </TableCell>
              )
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

