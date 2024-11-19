import { useState, useCallback } from 'react'
import { Teacher } from '../types'

export const useTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([
    { id: 1, name: 'John Doe', subjectId: 1 },
    { id: 2, name: 'Jane Smith', subjectId: 2 }
  ])

  const addTeacher = useCallback((name: string, subjectId: number) => {
    setTeachers(prevTeachers => {
      const newId = Math.max(...prevTeachers.map(t => t.id), 0) + 1
      return [...prevTeachers, { id: newId, name: name.trim(), subjectId }]
    })
  }, [])

  const updateTeacher = useCallback((teacherId: number, name: string, subjectId: number) => {
    setTeachers(prevTeachers => prevTeachers.map(teacher =>
      teacher.id === teacherId ? { ...teacher, name, subjectId } : teacher
    ))
  }, [])

  const deleteTeacher = useCallback((teacherId: number) => {
    setTeachers(prevTeachers => prevTeachers.filter(teacher => teacher.id !== teacherId))
  }, [])

  return {
    teachers,
    addTeacher,
    updateTeacher,
    deleteTeacher
  }
}