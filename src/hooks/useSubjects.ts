import { useState, useCallback } from 'react'
import { Subject } from '../types'

export const useSubjects = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 1, name: 'Math' },
    { id: 2, name: 'Science' }
  ])

  const addSubject = useCallback((name: string) => {
    setSubjects(prevSubjects => {
      const newId = Math.max(...prevSubjects.map(s => s.id), 0) + 1
      return [...prevSubjects, { id: newId, name: name.trim() }]
    })
  }, [])

  const updateSubject = useCallback((subjectId: number, name: string) => {
    setSubjects(prevSubjects => prevSubjects.map(subject =>
      subject.id === subjectId ? { ...subject, name: name.trim() } : subject
    ))
  }, [])

  const deleteSubject = useCallback((subjectId: number) => {
    setSubjects(prevSubjects => prevSubjects.filter(subject => subject.id !== subjectId))
  }, [])

  return {
    subjects,
    addSubject,
    updateSubject,
    deleteSubject
  }
}