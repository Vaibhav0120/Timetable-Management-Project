"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { TimeSlot } from "../../types"

interface TimeSlotManagerProps {
  timeSlots: TimeSlot[]
  addTimeSlot: (start_time: string, end_time: string) => Promise<void>
  updateTimeSlot: (timeSlotId: string, start_time: string, end_time: string) => Promise<void>
  deleteTimeSlot: (timeSlotId: string) => Promise<void>
}

export const TimeSlotManager: React.FC<TimeSlotManagerProps> = ({
  timeSlots,
  addTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
}) => {
  const [newStartTime, setNewStartTime] = useState("")
  const [newEndTime, setNewEndTime] = useState("")

  const handleAddTimeSlot = async () => {
    await addTimeSlot(newStartTime, newEndTime)
    setNewStartTime("")
    setNewEndTime("")
  }

  return (
    <div>
      <div className="mb-4 flex items-end space-x-2">
        <div>
          <label htmlFor="newStartTime" className="block text-sm font-medium text-gray-700">
            Start Time
          </label>
          <Input id="newStartTime" type="time" value={newStartTime} onChange={(e) => setNewStartTime(e.target.value)} />
        </div>
        <div>
          <label htmlFor="newEndTime" className="block text-sm font-medium text-gray-700">
            End Time
          </label>
          <Input id="newEndTime" type="time" value={newEndTime} onChange={(e) => setNewEndTime(e.target.value)} />
        </div>
        <Button onClick={handleAddTimeSlot}>Add Time Slot</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {timeSlots.map((timeSlot) => (
            <TableRow key={timeSlot.id}>
              <TableCell>{timeSlot.start_time}</TableCell>
              <TableCell>{timeSlot.end_time}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateTimeSlot(timeSlot.id, timeSlot.start_time, timeSlot.end_time)}
                >
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => deleteTimeSlot(timeSlot.id)} className="ml-2">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

