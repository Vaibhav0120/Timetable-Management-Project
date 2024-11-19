import { TimeTableEntry, Class, Teacher, Subject } from "../types";

export const generateEmptyTimetable = (
  classId: number,
  sectionId: number,
  days: Day[],
  timeSlots: TimeSlot[]
): TimeTableEntry[] => {
  const emptyTimetable: TimeTableEntry[] = [];
  let timeTableId = 1;

  days.forEach((day) => {
    timeSlots.forEach((slot) => {
      emptyTimetable.push({
        timeTableId: timeTableId++,
        teacherId: 0,
        classId: classId,
        sectionId: sectionId,
        timeSlotId: slot.id,
        dayId: day.id,
      });
    });
  });

  return emptyTimetable;
};

export const getTeacherName = (
  teacherId: number,
  teachers: Teacher[]
): string => {
  return teachers.find((t) => t.id === teacherId)?.name || "";
};

export const getSubjectName = (
  teacherId: number,
  teachers: Teacher[],
  subjects: Subject[]
): string => {
  const teacher = teachers.find((t) => t.id === teacherId);
  return subjects.find((s) => s.id === teacher?.subjectId)?.name || "";
};

export const checkConflictsAcrossTimeTables = (
  teacherId: number,
  timeSlotId: number,
  dayId: number,
  currentClassId: number,
  currentSectionId: number,
  savedTimeTables: { [key: string]: TimeTableEntry[] }
): boolean => {
  return Object.entries(savedTimeTables).some(([key, savedTimeTable]) => {
    const [classId, sectionId] = key.split("-").map(Number);
    return savedTimeTable.some(
      (entry) =>
        entry.teacherId === teacherId &&
        entry.timeSlotId === timeSlotId &&
        entry.dayId === dayId &&
        (classId !== currentClassId || sectionId !== currentSectionId)
    );
  });
};
