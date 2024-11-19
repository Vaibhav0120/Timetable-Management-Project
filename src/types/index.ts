export type Teacher = { id: number; name: string; subjectId: number }
export type Subject = { id: number; name: string }
export type Section = { id: number; name: string }
export type Class = { id: number; name: string; sections: Section[] }
export type TimeSlot = { id: number; startTime: string; endTime: string }
export type Day = { id: number; name: string }
export type TimeTableEntry = { timeTableId: number; teacherId: number; classId: number; sectionId: number; timeSlotId: number; dayId: number }