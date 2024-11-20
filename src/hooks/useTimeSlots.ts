import { useState, useCallback } from 'react'
import { TimeSlot } from '../types'

export const useTimeSlots = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: 1, startTime: '09:05', endTime: '09:55' },
    { id: 2, startTime: '09:55', endTime: '10:45' },
    { id: 3, startTime: '10:45', endTime: '11:35' },
    { id: 4, startTime: '11:35', endTime: '12:25' },
    { id: 5, startTime: '12:25', endTime: '13:15' },
    { id: 6, startTime: '13:15', endTime: '14:05' },
    { id: 7, startTime: '14:05', endTime: '15:00' },
    { id: 8, startTime: '15:00', endTime: '15:55' },
    { id: 9, startTime: '15:55', endTime: '16:50' }
  ])

  const addTimeSlot = useCallback((startTime: string, endTime: string) => {
    setTimeSlots(prevTimeSlots => {
      const newId = Math.max(...prevTimeSlots.map(t => t.id), 0) + 1
      return [...prevTimeSlots, { id: newId, startTime, endTime }]
    })
  }, [])

  const updateTimeSlot = useCallback((updatedTimeSlot: TimeSlot) => {
    setTimeSlots(prevTimeSlots => prevTimeSlots.map(slot =>
      slot.id === updatedTimeSlot.id ? updatedTimeSlot : slot
    ))
  }, [])

  const deleteTimeSlot = useCallback((id: number) => {
    setTimeSlots(prevTimeSlots => prevTimeSlots.filter(slot => slot.id !== id))
  }, [])

  return {
    timeSlots,
    addTimeSlot,
    updateTimeSlot,
    deleteTimeSlot
  }
}