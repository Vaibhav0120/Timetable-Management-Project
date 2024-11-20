// src/components/TeacherSubject/TeacherSubjectManager.tsx
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Teacher, Subject } from '../../types'

interface TeacherSubjectManagerProps {
  teachers: Teacher[]
  subjects: Subject[]
  addTeacher: (name: string, subjectId: number) => void
  updateTeacher: (teacherId: number, name: string, subjectId: number) => void
  deleteTeacher: (teacherId: number) => void
  addSubject: (name: string) => void
  updateSubject: (subjectId: number, name: string) => void
  deleteSubject: (subjectId: number) => void
  onTeacherSelect: (teacherId: number) => void
}

export const TeacherSubjectManager: React.FC<TeacherSubjectManagerProps> = ({
  teachers,
  subjects,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  addSubject,
  updateSubject,
  deleteSubject,
  onTeacherSelect
}) => {
  const [newTeacherName, setNewTeacherName] = useState('')
  const [newTeacherSubject, setNewTeacherSubject] = useState('')
  const [newSubjectName, setNewSubjectName] = useState('')

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Teachers</h3>
        {teachers.map(teacher => (
          <div key={teacher.id} className="flex items-center gap-2">
            <Input
              value={teacher.name}
              onChange={(e) => updateTeacher(teacher.id, e.target.value, teacher.subjectId)}
              className="flex-grow"
            />
            <Select
              defaultValue={teacher.subjectId.toString()}
              onValueChange={(value) => updateTeacher(teacher.id, teacher.name, Number(value))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map(subject => (
                  <SelectItem key={subject.id} value={subject.id.toString()}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="destructive" onClick={() => deleteTeacher(teacher.id)}>Delete</Button>
            <Button onClick={() => onTeacherSelect(teacher.id)}>Select</Button>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <Input
            placeholder="New teacher name"
            value={newTeacherName}
            onChange={(e) => setNewTeacherName(e.target.value)}
            className="flex-grow"
          />
          <Select value={newTeacherSubject} onValueChange={setNewTeacherSubject}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map(subject => (
                <SelectItem key={subject.id} value={subject.id.toString()}>
                  {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => {
            if (newTeacherName && newTeacherSubject) {
              addTeacher(newTeacherName, Number(newTeacherSubject))
              setNewTeacherName('')
              setNewTeacherSubject('')
            }
          }}>Add Teacher</Button>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Subjects</h3>
        {subjects.map(subject => (
          <div key={subject.id} className="flex items-center gap-2">
            <Input
              value={subject.name}
              onChange={(e) => updateSubject(subject.id, e.target.value)}
              className="flex-grow"
            />
            <Button variant="destructive" onClick={() => deleteSubject(subject.id)}>Delete</Button>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <Input
            placeholder="New subject name"
            value={newSubjectName}
            onChange={(e) => setNewSubjectName(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={() => {
            if (newSubjectName) {
              addSubject(newSubjectName)
              setNewSubjectName('')
            }
          }}>Add Subject</Button>
        </div>
      </div>
    </div>
  )
}