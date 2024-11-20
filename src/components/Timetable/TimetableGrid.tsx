import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TimeTableEntry, Day, TimeSlot, Teacher, Subject } from '../../types'
import { TimetableCell } from './TimetableCell'

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
  onCellClick
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Time Slot</TableHead>
          {days.map(day => (
            <TableHead key={day.id}>{day.name}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {timeSlots.map(slot => (
          <TableRow key={slot.id}>
            <TableCell>
              {`${slot.startTime} - ${slot.endTime}`}
            </TableCell>
            {days.map(day => {
              const entry = timeTable.find(
                e => e.timeSlotId === slot.id && e.dayId === day.id
              )
              return (
                <TimetableCell
                  key={day.id}
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