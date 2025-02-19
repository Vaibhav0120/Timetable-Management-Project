"use client"

import { useState, useCallback, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { TimeSlot } from "../types"

export const useTimeSlots = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const supabase = createClientComponentClient()

  const fetchTimeSlots = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    try {
      const { data, error } = await supabase.from("timeslots").select("*").eq("user_id", user.id)

      if (error) {
        console.error("Error fetching time slots:", error)
        return
      }

      setTimeSlots(
        data.map((slot) => ({
          ...slot,
          start_time: formatTime(slot.start_time),
          end_time: formatTime(slot.end_time),
        })),
      )
    } catch (error) {
      console.error("Error fetching time slots:", error)
    }
  }, [supabase])

  useEffect(() => {
    fetchTimeSlots()
  }, [fetchTimeSlots])

  const addTimeSlot = useCallback(
    async (start_time: string, end_time: string) => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      try {
        const { data, error } = await supabase
          .from("timeslots")
          .insert({ start_time: formatTimeForDB(start_time), end_time: formatTimeForDB(end_time), user_id: user.id })
          .select()
          .single()

        if (error) {
          console.error("Error adding time slot:", error)
          return
        }

        setTimeSlots((prevTimeSlots) => [
          ...prevTimeSlots,
          {
            ...data,
            start_time: formatTime(data.start_time),
            end_time: formatTime(data.end_time),
          },
        ])
      } catch (error) {
        console.error("Error adding time slot:", error)
      }
    },
    [supabase],
  )

  const updateTimeSlot = useCallback(
    async (timeSlotId: string, start_time: string, end_time: string) => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      try {
        const { error } = await supabase
          .from("timeslots")
          .update({ start_time: formatTimeForDB(start_time), end_time: formatTimeForDB(end_time) })
          .eq("id", timeSlotId)
          .eq("user_id", user.id)

        if (error) {
          console.error("Error updating time slot:", error)
          return
        }

        setTimeSlots((prevTimeSlots) =>
          prevTimeSlots.map((timeSlot) =>
            timeSlot.id === timeSlotId
              ? { ...timeSlot, start_time: formatTime(start_time), end_time: formatTime(end_time) }
              : timeSlot,
          ),
        )
      } catch (error) {
        console.error("Error updating time slot:", error)
      }
    },
    [supabase],
  )

  const deleteTimeSlot = useCallback(
    async (timeSlotId: string) => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      try {
        const { error } = await supabase.from("timeslots").delete().eq("id", timeSlotId).eq("user_id", user.id)

        if (error) {
          console.error("Error deleting time slot:", error)
          return
        }

        setTimeSlots((prevTimeSlots) => prevTimeSlots.filter((timeSlot) => timeSlot.id !== timeSlotId))
      } catch (error) {
        console.error("Error deleting time slot:", error)
      }
    },
    [supabase],
  )

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    const date = new Date(2000, 0, 1, Number.parseInt(hours), Number.parseInt(minutes))
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
  }

  const formatTimeForDB = (time: string) => {
    const [hours, minutes] = time.split(":")
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:00`
  }

  return {
    timeSlots,
    addTimeSlot,
    updateTimeSlot,
    deleteTimeSlot,
    fetchTimeSlots,
  }
}

