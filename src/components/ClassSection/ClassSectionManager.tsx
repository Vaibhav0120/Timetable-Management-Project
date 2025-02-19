"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Class, Section } from "../../types"
import { Edit, Trash2 } from "lucide-react"

interface ClassSectionManagerProps {
  classes: Class[]
  addClass: (name: string) => Promise<void>
  updateClass: (updatedClass: Class) => Promise<void>
  deleteClass: (classId: string) => Promise<void>
  addSection: (classId: string, sectionName: string) => Promise<void>
  updateSection: (classId: string, updatedSection: Section) => Promise<void>
  deleteSection: (classId: string, sectionId: string) => Promise<void>
}

export const ClassSectionManager: React.FC<ClassSectionManagerProps> = ({
  classes,
  addClass,
  updateClass,
  deleteClass,
  addSection,
  updateSection,
  deleteSection,
}) => {
  const [newClassName, setNewClassName] = useState("")
  const [newSectionNames, setNewSectionNames] = useState<{ [key: string]: string }>({})
  const [editingClass, setEditingClass] = useState<Class | null>(null)
  const [editingSection, setEditingSection] = useState<{ classId: string; section: Section } | null>(null)

  return (
    <div className="space-y-4">
      {classes.map((c) => (
        <div key={c.id} className="border p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            {editingClass && editingClass.id === c.id ? (
              <>
                <Input
                  value={editingClass.name}
                  onChange={(e) => setEditingClass({ ...editingClass, name: e.target.value })}
                  className="w-48"
                />
                <div>
                  <Button
                    onClick={async () => {
                      await updateClass(editingClass)
                      setEditingClass(null)
                    }}
                    className="mr-2"
                  >
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setEditingClass(null)}>
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold">{c.name}</h3>
                <div>
                  <Button variant="outline" onClick={() => setEditingClass(c)} className="mr-2">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" onClick={() => deleteClass(c.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
          <div className="ml-4 space-y-2">
            {c.sections.map((s) => (
              <div key={s.id} className="flex items-center justify-between">
                {editingSection && editingSection.classId === c.id && editingSection.section.id === s.id ? (
                  <>
                    <Input
                      value={editingSection.section.name}
                      onChange={(e) =>
                        setEditingSection({
                          ...editingSection,
                          section: { ...editingSection.section, name: e.target.value },
                        })
                      }
                      className="w-48"
                    />
                    <div>
                      <Button
                        onClick={async () => {
                          await updateSection(c.id, editingSection.section)
                          setEditingSection(null)
                        }}
                        className="mr-2"
                      >
                        Save
                      </Button>
                      <Button variant="outline" onClick={() => setEditingSection(null)}>
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <span>{s.name}</span>
                    <div>
                      <Button
                        variant="outline"
                        onClick={() => setEditingSection({ classId: c.id, section: s })}
                        className="mr-2"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" onClick={() => deleteSection(c.id, s.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
            <div className="flex items-center mt-2">
              <Input
                placeholder="New section name"
                value={newSectionNames[c.id] || ""}
                onChange={(e) => setNewSectionNames((prev) => ({ ...prev, [c.id]: e.target.value }))}
                className="w-48 mr-2"
              />
              <Button
                onClick={async () => {
                  await addSection(c.id, newSectionNames[c.id])
                  setNewSectionNames((prev) => ({ ...prev, [c.id]: "" }))
                }}
              >
                Add Section
              </Button>
            </div>
          </div>
        </div>
      ))}
      <div className="flex items-center gap-4 mt-4">
        <Input placeholder="New class name" value={newClassName} onChange={(e) => setNewClassName(e.target.value)} />
        <Button
          onClick={async () => {
            await addClass(newClassName)
            setNewClassName("")
          }}
        >
          Add Class
        </Button>
      </div>
    </div>
  )
}

