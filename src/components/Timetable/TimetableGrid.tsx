import type React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { TimeTableEntry, Day, TimeSlot, Teacher, Subject } from "../../types"
import { TimetableCell } from "./TimetableCell"

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
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-24">Day / Time</TableHead>
          {timeSlots.map((slot) => (
            <TableHead key={slot.id}>{`${slot.start_time} - ${slot.end_time}`}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {days.map((day) => (
          <TableRow key={day.id}>
            <TableCell className="font-medium">{day.name}</TableCell>
            {timeSlots.map((slot) => {
              const entry = timeTable.find((e) => e.time_slot_id === slot.id && e.day_id === day.id)
              return (
                <TimetableCell
                  key={`${day.id}-${slot.id}`}
                  entry={entry}
                  teachers={teachers}
                  subjects={subjects}
                  onClick={() => entry && onCellClick(entry)}
                />
              )
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

