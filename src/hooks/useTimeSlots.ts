import { useState, useCallback } from 'react'
import { TimeSlot } from '../types'

export const useTimeSlots = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: 1, startTime: '09:00', endTime: '10:00' },
    { id: 2, startTime: '10:00', endTime: '11:00' }
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