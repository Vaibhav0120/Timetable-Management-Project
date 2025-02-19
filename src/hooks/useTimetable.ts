"use client"

import { useCallback, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Day, TimeSlot, TimeTableEntry } from "../types"

export const useTimetable = () => {
  const [timeTable, setTimeTable] = useState<TimeTableEntry[]>([])
  const supabase = createClientComponentClient()

  const initializeTimeTable = useCallback(
    async (classId: string, sectionId: string, days: Day[], timeSlots: TimeSlot[]) => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const emptyTimetable = days.flatMap((day) =>
        timeSlots.map((timeSlot) => ({
          id: `${classId}-${sectionId}-${day.id}-${timeSlot.id}`,
          user_id: user.id,
          class_id: classId,
          section_id: sectionId,
          day_id: day.id,
          time_slot_id: timeSlot.id,
          teacher_id: null,
          subject_id: null,
        })),
      )

      try {
        const { data, error } = await supabase
          .from("timetableentries")
          .upsert(emptyTimetable, { onConflict: "user_id,class_id,section_id,day_id,time_slot_id" })
          .select()

        if (error) {
          console.error("Error initializing timetable:", error)
          return
        }

        setTimeTable(data || [])
      } catch (error) {
        console.error("Error initializing timetable:", error)
      }
    },
    [supabase],
  )

  const fetchTimetable = useCallback(
    async (classId: string, sectionId: string) => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      try {
        const { data, error } = await supabase
          .from("timetableentries")
          .select("*")
          .eq("user_id", user.id)
          .eq("class_id", classId)
          .eq("section_id", sectionId)

        if (error) {
          console.error("Error fetching timetable:", error)
          return
        }

        setTimeTable(data || [])
      } catch (error) {
        console.error("Error fetching timetable:", error)
      }
    },
    [supabase],
  )

  const updateTeacherInTimeTable = useCallback(
    async (
      teacherId: string,
      subjectId: string,
      classId: string,
      sectionId: string,
      timeSlotId: string,
      dayId: number,
    ) => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      try {
        const { data, error } = await supabase
          .from("timetableentries")
          .upsert(
            {
              id: `${classId}-${sectionId}-${dayId}-${timeSlotId}`,
              user_id: user.id,
              class_id: classId,
              section_id: sectionId,
              day_id: dayId,
              time_slot_id: timeSlotId,
              teacher_id: teacherId,
              subject_id: subjectId,
            },
            { onConflict: "user_id,class_id,section_id,day_id,time_slot_id" },
          )
          .select()
          .single()

        if (error) {
          console.error("Error updating teacher in timetable:", error)
          return
        }

        setTimeTable((prevTimeTable) =>
          prevTimeTable.map((entry) =>
            entry.class_id === classId &&
            entry.section_id === sectionId &&
            entry.day_id === dayId &&
            entry.time_slot_id === timeSlotId
              ? data
              : entry,
          ),
        )
      } catch (error) {
        console.error("Error updating teacher in timetable:", error)
      }
    },
    [supabase],
  )

  return { timeTable, initializeTimeTable, fetchTimetable, updateTeacherInTimeTable }
}

