import { useState, useCallback } from "react";
import { TimeTableEntry, Day } from "../types";
import { generateEmptyTimetable } from "../utils/helpers";

export const useTimetable = () => {
  const [timeTable, setTimeTable] = useState<TimeTableEntry[]>([]);
  const [savedTimeTables, setSavedTimeTables] = useState<{
    [key: string]: TimeTableEntry[];
  }>({});

  const initializeTimeTable = useCallback(
    (
      classId: number,
      sectionId: number,
      days: Day[],
      timeSlots: TimeSlot[]
    ) => {
      const key = `${classId}-${sectionId}`;
      if (savedTimeTables[key]) {
        setTimeTable(savedTimeTables[key]);
      } else {
        const emptyTimetable = generateEmptyTimetable(
          classId,
          sectionId,
          days,
          timeSlots
        );
        setTimeTable(emptyTimetable);
      }
    },
    [savedTimeTables]
  );

  const updateTeacherInTimeTable = useCallback(
    (
      teacherId: number,
      classId: number,
      sectionId: number,
      timeSlotId: number,
      dayId: number
    ) => {
      setTimeTable((prevTimeTable) =>
        prevTimeTable.map((entry) =>
          entry.classId === classId &&
          entry.sectionId === sectionId &&
          entry.timeSlotId === timeSlotId &&
          entry.dayId === dayId
            ? { ...entry, teacherId: teacherId }
            : entry
        )
      );
    },
    []
  );

  const saveTimetable = useCallback(
    (classId: number, sectionId: number) => {
      const key = `${classId}-${sectionId}`;
      setSavedTimeTables((prevState) => ({
        ...prevState,
        [key]: timeTable,
      }));
    },
    [timeTable]
  );

  return {
    timeTable,
    savedTimeTables,
    initializeTimeTable,
    updateTeacherInTimeTable,
    saveTimetable,
  };
};
