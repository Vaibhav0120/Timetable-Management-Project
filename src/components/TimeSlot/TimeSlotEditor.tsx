import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { TimeSlot } from '../../types'

interface TimeSlotEditorProps {
  timeSlot: TimeSlot | null
  onUpdate: (updatedTimeSlot: TimeSlot) => void
  onClose: () => void
}

export const TimeSlotEditor: React.FC<TimeSlotEditorProps> = ({ timeSlot, onUpdate, onClose }) => {
  if (!timeSlot) return null

  return (
    <Dialog open={!!timeSlot} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Time Slot</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={timeSlot.startTime}
                onChange={(e) => onUpdate({ ...timeSlot, startTime: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={timeSlot.endTime}
                onChange={(e) => onUpdate({ ...timeSlot, endTime: e.target.value })}
              />
            </div>
          </div>
          <Button onClick={() => {
            onUpdate(timeSlot)
            onClose()
          }}>
            Update Time Slot
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}