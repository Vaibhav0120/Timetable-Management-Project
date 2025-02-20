"use client"

import { useState, useCallback } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Day, TimeSlot, TimeTableEntry } from "../types"

export const useTimetable = () => {
  const [timeTable, setTimeTable] = useState<TimeTableEntry[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClientComponentClient()

  const initializeTimeTable = useCallback(
    async (classId: string, sectionId: string, days: Day[], timeSlots: TimeSlot[]) => {
      setIsLoading(true)
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        console.error("User not authenticated")
        setIsLoading(false)
        return
      }

      try {
        // First, fetch existing entries
        const { data: existingEntries, error: fetchError } = await supabase
          .from("timetableentries")
          .select("*")
          .eq("user_id", user.id)
          .eq("class_id", classId)
          .eq("section_id", sectionId)

        if (fetchError) {
          console.error("Error fetching existing entries:", fetchError)
          setIsLoading(false)
          return
        }

        // Create map of existing entries for quick lookup
        const existingEntriesMap = new Map(
          existingEntries?.map((entry) => [`${entry.day_id}-${entry.time_slot_id}`, entry]),
        )

        // Create or update entries
        const entriesToUpsert = days.flatMap((day) =>
          timeSlots.map((timeSlot) => {
            const key = `${day.id}-${timeSlot.id}`
            const existing = existingEntriesMap.get(key)
            return {
              user_id: user.id,
              class_id: classId,
              section_id: sectionId,
              day_id: day.id,
              time_slot_id: timeSlot.id,
              teacher_id: existing?.teacher_id || null,
              subject_id: existing?.subject_id || null,
            }
          }),
        )

        const { data, error } = await supabase
          .from("timetableentries")
          .upsert(entriesToUpsert, {
            onConflict: "user_id,class_id,section_id,day_id,time_slot_id",
          })
          .select()

        if (error) {
          console.error("Error initializing timetable:", error)
          setIsLoading(false)
          return
        }

        setTimeTable(data || [])

        // Fetch the timetable after initialization to ensure we have the latest data
        await fetchTimetable(classId, sectionId)
      } catch (error) {
        console.error("Unexpected error initializing timetable:", error)
      } finally {
        setIsLoading(false)
      }
    },
    [supabase],
  )

  const fetchTimetable = useCallback(
    async (classId: string, sectionId: string) => {
      setIsLoading(true)
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        console.error("User not authenticated")
        setIsLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from("timetableentries")
          .select("*")
          .eq("user_id", user.id)
          .eq("class_id", classId)
          .eq("section_id", sectionId)

        if (error) {
          console.error("Error fetching timetable:", error)
          setIsLoading(false)
          return
        }

        setTimeTable(data || [])
      } catch (error) {
        console.error("Unexpected error fetching timetable:", error)
      } finally {
        setIsLoading(false)
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
      setIsLoading(true)
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        console.error("User not authenticated")
        setIsLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from("timetableentries")
          .upsert(
            {
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
          setIsLoading(false)
          return
        }

        // Update the local state
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

        // Fetch the latest data to ensure consistency
        await fetchTimetable(classId, sectionId)
      } catch (error) {
        console.error("Unexpected error updating teacher in timetable:", error)
      } finally {
        setIsLoading(false)
      }
    },
    [supabase, fetchTimetable],
  )

  const clearTimeTable = useCallback(() => {
    setTimeTable([])
  }, [])

  return {
    timeTable,
    isLoading,
    initializeTimeTable,
    fetchTimetable,
    updateTeacherInTimeTable,
    clearTimeTable,
  }
}

