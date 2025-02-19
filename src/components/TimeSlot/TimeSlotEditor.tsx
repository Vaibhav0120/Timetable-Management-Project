import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { TimeSlot } from "../../types"

interface TimeSlotEditorProps {
  timeSlot: TimeSlot | null
  onUpdate: (timeSlotId: string, start_time: string, end_time: string) => Promise<void>
  onClose: () => void
}

export const TimeSlotEditor: React.FC<TimeSlotEditorProps> = ({ timeSlot, onUpdate, onClose }) => {
  if (!timeSlot) return null

  const handleUpdate = async () => {
    await onUpdate(timeSlot.id, timeSlot.start_time, timeSlot.end_time)
    onClose()
  }

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
                value={timeSlot.start_time}
                onChange={(e) => onUpdate(timeSlot.id, e.target.value, timeSlot.end_time)}
              />
            </div>
            <div>
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={timeSlot.end_time}
                onChange={(e) => onUpdate(timeSlot.id, timeSlot.start_time, e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleUpdate}>Update Time Slot</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

