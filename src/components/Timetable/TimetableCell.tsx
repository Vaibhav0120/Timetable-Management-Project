import type React from "react"
import { TableCell } from "@/components/ui/table"
import type { TimeTableEntry, Teacher, Subject } from "../../types"

interface TimetableCellProps {
  entry: TimeTableEntry | undefined
  teachers: Teacher[]
  subjects: Subject[]
  onClick: () => void
}

export const TimetableCell: React.FC<TimetableCellProps> = ({ entry, teachers, subjects, onClick }) => {
  const getTeacherName = (teacherId: string | null) => {
    return teachers.find((t) => t.id === teacherId)?.name || ""
  }

  const getSubjectName = (subjectId: string | null) => {
    return subjects.find((s) => s.id === subjectId)?.name || ""
  }

  return (
    <TableCell className="cursor-pointer hover:bg-gray-100" onClick={onClick}>
      {entry && entry.teacher_id ? (
        <>
          <div>{getSubjectName(entry.subject_id)}</div>
          <div>{getTeacherName(entry.teacher_id)}</div>
        </>
      ) : (
        "-"
      )}
    </TableCell>
  )
}

