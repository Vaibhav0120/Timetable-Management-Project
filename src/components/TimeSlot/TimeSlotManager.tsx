import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { TimeSlot } from "../../types"
import { Trash2 } from "lucide-react"

interface TimeSlotManagerProps {
  timeSlots: TimeSlot[]
  addTimeSlot: (start_time: string, end_time: string) => Promise<void>
  updateTimeSlot: (timeSlotId: string, start_time: string, end_time: string) => Promise<void>
  deleteTimeSlot: (id: string) => Promise<void>
}

export const TimeSlotManager: React.FC<TimeSlotManagerProps> = ({
  timeSlots,
  addTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
}) => {
  const [newTimeSlot, setNewTimeSlot] = useState<{ start_time: string; end_time: string }>({
    start_time: "",
    end_time: "",
  })

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Time Slots</h3>
      {timeSlots.map((slot) => (
        <div key={slot.id} className="flex items-center gap-4">
          <Input
            type="time"
            value={slot.start_time}
            onChange={(e) => updateTimeSlot(slot.id, e.target.value, slot.end_time)}
          />
          <Input
            type="time"
            value={slot.end_time}
            onChange={(e) => updateTimeSlot(slot.id, slot.start_time, e.target.value)}
          />
          <Button variant="destructive" onClick={() => deleteTimeSlot(slot.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <div className="flex items-center gap-4">
        <Input
          type="time"
          value={newTimeSlot.start_time}
          onChange={(e) => setNewTimeSlot({ ...newTimeSlot, start_time: e.target.value })}
          placeholder="Start Time"
        />
        <Input
          type="time"
          value={newTimeSlot.end_time}
          onChange={(e) => setNewTimeSlot({ ...newTimeSlot, end_time: e.target.value })}
          placeholder="End Time"
        />
        <Button
          onClick={async () => {
            if (newTimeSlot.start_time && newTimeSlot.end_time) {
              await addTimeSlot(newTimeSlot.start_time, newTimeSlot.end_time)
              setNewTimeSlot({ start_time: "", end_time: "" })
            }
          }}
        >
          Add Time Slot
        </Button>
      </div>
    </div>
  )
}

