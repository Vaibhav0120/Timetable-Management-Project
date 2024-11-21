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
          <TableHead>Day</TableHead>
          {timeSlots.map(slot => (
            <TableHead key={slot.id}>{`${slot.startTime} - ${slot.endTime}`}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {days.map(day => (
          <TableRow key={day.id}>
            <TableCell>{day.name}</TableCell>
            {timeSlots.map(slot => {
              const entry = timeTable.find(
                e => e.timeSlotId === slot.id && e.dayId === day.id
              )
              return (
                <TimetableCell
                  key={slot.id}
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

