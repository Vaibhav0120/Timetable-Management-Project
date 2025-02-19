"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Teacher, Subject } from "../../types"

interface TeacherSubjectManagerProps {
  teachers: Teacher[]
  subjects: Subject[]
  addTeacher: (name: string, subjectId: string) => Promise<void>
  updateTeacher: (teacherId: string, name: string, subjectId: string) => Promise<void>
  deleteTeacher: (teacherId: string) => Promise<void>
  addSubject: (name: string) => Promise<void>
  updateSubject: (subjectId: string, name: string) => Promise<void>
  deleteSubject: (subjectId: string) => Promise<void>
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
}) => {
  const [newTeacherName, setNewTeacherName] = useState("")
  const [newTeacherSubject, setNewTeacherSubject] = useState("")
  const [newSubjectName, setNewSubjectName] = useState("")

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Teachers</h3>
        {teachers.map((teacher) => (
          <div key={teacher.id} className="flex items-center gap-2">
            <Input
              value={teacher.name}
              onChange={(e) => updateTeacher(teacher.id, e.target.value, teacher.subject_id)}
              className="flex-grow"
            />
            <Select
              defaultValue={teacher.subject_id}
              onValueChange={(value) => updateTeacher(teacher.id, teacher.name, value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="destructive" onClick={() => deleteTeacher(teacher.id)}>
              Delete
            </Button>
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
              {subjects.map((subject) => (
                <SelectItem key={subject.id} value={subject.id}>
                  {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={async () => {
              if (newTeacherName && newTeacherSubject) {
                await addTeacher(newTeacherName, newTeacherSubject)
                setNewTeacherName("")
                setNewTeacherSubject("")
              }
            }}
          >
            Add Teacher
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Subjects</h3>
        {subjects.map((subject) => (
          <div key={subject.id} className="flex items-center gap-2">
            <Input
              value={subject.name}
              onChange={(e) => updateSubject(subject.id, e.target.value)}
              className="flex-grow"
            />
            <Button variant="destructive" onClick={() => deleteSubject(subject.id)}>
              Delete
            </Button>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <Input
            placeholder="New subject name"
            value={newSubjectName}
            onChange={(e) => setNewSubjectName(e.target.value)}
            className="flex-grow"
          />
          <Button
            onClick={async () => {
              if (newSubjectName) {
                await addSubject(newSubjectName)
                setNewSubjectName("")
              }
            }}
          >
            Add Subject
          </Button>
        </div>
      </div>
    </div>
  )
}

