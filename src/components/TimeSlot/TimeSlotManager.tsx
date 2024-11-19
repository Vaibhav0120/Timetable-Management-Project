import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TimeSlot } from "../../types";
import { Trash2 } from "lucide-react";

interface TimeSlotManagerProps {
  timeSlots: TimeSlot[];
  addTimeSlot: (startTime: string, endTime: string) => void;
  updateTimeSlot: (updatedTimeSlot: TimeSlot) => void;
  deleteTimeSlot: (id: number) => void;
}

export const TimeSlotManager: React.FC<TimeSlotManagerProps> = ({
  timeSlots,
  addTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
}) => {
  const [newTimeSlot, setNewTimeSlot] = useState<{
    startTime: string;
    endTime: string;
  }>({ startTime: "", endTime: "" });

  return (
    <div className="grid gap-4">
      <h3 className="text-lg font-semibold">Time Slots</h3>
      {timeSlots.map((slot) => (
        <div key={slot.id} className="flex items-center gap-4">
          <Input
            type="time"
            value={slot.startTime}
            onChange={(e) =>
              updateTimeSlot({ ...slot, startTime: e.target.value })
            }
          />
          <Input
            type="time"
            value={slot.endTime}
            onChange={(e) =>
              updateTimeSlot({ ...slot, endTime: e.target.value })
            }
          />
          <Button variant="destructive" onClick={() => deleteTimeSlot(slot.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <div className="flex items-center gap-4">
        <Input
          type="time"
          value={newTimeSlot.startTime}
          onChange={(e) =>
            setNewTimeSlot({ ...newTimeSlot, startTime: e.target.value })
          }
          placeholder="Start Time"
        />
        <Input
          type="time"
          value={newTimeSlot.endTime}
          onChange={(e) =>
            setNewTimeSlot({ ...newTimeSlot, endTime: e.target.value })
          }
          placeholder="End Time"
        />
        <Button
          onClick={() => {
            if (newTimeSlot.startTime && newTimeSlot.endTime) {
              addTimeSlot(newTimeSlot.startTime, newTimeSlot.endTime);
              setNewTimeSlot({ startTime: "", endTime: "" });
            }
          }}
        >
          Add Time Slot
        </Button>
      </div>
    </div>
  );
};
