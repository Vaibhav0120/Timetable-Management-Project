export type Teacher = {
    id: string
    user_id: string
    name: string
    subject_id: string
  }
  
  export type Subject = {
    id: string
    user_id: string
    name: string
  }
  
  export type Section = {
    id: string
    user_id: string
    name: string
    class_id: string
  }
  
  export type Class = {
    id: string
    user_id: string
    name: string
    sections: Section[]
  }
  
  export type TimeSlot = {
    id: string
    user_id: string
    start_time: string
    end_time: string
  }
  
  export type Day = {
    id: number
    name: string
  }
  
  export type TimeTableEntry = {
    id: string
    user_id: string
    teacher_id: string
    class_id: string
    section_id: string
    subject_id: string
    time_slot_id: string
    day_id: number
  }
  
  