import { useState, useCallback } from 'react'
import { Subject } from '../types'

export const useSubjects = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 1, name: 'Data Structure (DS)' },
    { id: 2, name: 'Python Prigramming (PP)' },
    { id: 3, name: 'Maths IV' },
    { id: 4, name: 'Technical Communication (TC)' },
    { id: 5, name: 'Computer Organization and Architecture (COA)' }
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