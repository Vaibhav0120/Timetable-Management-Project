import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
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
}

export const TeacherSubjectManager: React.FC<TeacherSubjectManagerProps> = ({
  teachers,
  subjects,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  addSubject,
  updateSubject,
  deleteSubject
}) => {
  const [newTeacherName, setNewTeacherName] = useState('')
  const [newTeacherSubject, setNewTeacherSubject] = useState('')
  const [newSubjectName, setNewSubjectName] = useState('')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Manage Teachers and Subjects</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Teachers and Subjects</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Teachers</h3>
            {teachers.map(teacher => (
              <div key={teacher.id} className="flex items-center gap-4">
                <Input
                  value={teacher.name}
                  onChange={(e) => updateTeacher(teacher.id, e.target.value, teacher.subjectId)}
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
              </div>
            ))}
            <div className="flex items-center gap-4">
              <Input
                placeholder="New teacher name"
                value={newTeacherName}
                onChange={(e) => setNewTeacherName(e.target.value)}
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
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Subjects</h3>
            {subjects.map(subject => (
              <div key={subject.id} className="flex items-center gap-4">
                <Input
                  value={subject.name}
                  onChange={(e) => updateSubject(subject.id, e.target.value)}
                />
                <Button variant="destructive" onClick={() => deleteSubject(subject.id)}>Delete</Button>
              </div>
            ))}
            <div className="flex items-center gap-4">
              <Input
                placeholder="New subject name"
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
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
      </DialogContent>
    </Dialog>
  )
}