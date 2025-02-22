"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      if (data.user) {
        await addDefaultData(data.user.id)
        toast({
          title: "Account created",
          description: "Please check your email to verify your account.",
        })
        router.push("/login")
      }
    } catch (error) {
      console.error("Error during signup:", error)
      toast({
        title: "Error",
        description: "An error occurred during signup. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const addDefaultData = async (userId: string) => {
    try {
      // Add default subjects
      const { data: subjectsData, error: subjectsError } = await supabase
        .from("subjects")
        .insert([
          { name: "Mathematics", user_id: userId },
          { name: "Physics", user_id: userId },
          { name: "Chemistry", user_id: userId },
          { name: "Biology", user_id: userId },
          { name: "English", user_id: userId },
        ])
        .select()

      if (subjectsError) throw subjectsError

      // Add default teachers
      const { error: teachersError } = await supabase.from("teachers").insert([
        { name: "Teacher 1", subject_id: subjectsData[0].id, user_id: userId },
        { name: "Teacher 2", subject_id: subjectsData[1].id, user_id: userId },
        { name: "Teacher 3", subject_id: subjectsData[2].id, user_id: userId },
        { name: "Teacher 4", subject_id: subjectsData[3].id, user_id: userId },
        { name: "Teacher 5", subject_id: subjectsData[4].id, user_id: userId },
      ])

      if (teachersError) throw teachersError

      // Add default classes
      const { data: classesData, error: classesError } = await supabase
        .from("classes")
        .insert([
          { name: "Class 1", user_id: userId },
          { name: "Class 2", user_id: userId },
        ])
        .select()

      if (classesError) throw classesError

      // Add default sections
      const { error: sectionsError } = await supabase.from("sections").insert([
        { name: "Section A", class_id: classesData[0].id, user_id: userId },
        { name: "Section B", class_id: classesData[0].id, user_id: userId },
        { name: "Section A", class_id: classesData[1].id, user_id: userId },
        { name: "Section B", class_id: classesData[1].id, user_id: userId },
      ])

      if (sectionsError) throw sectionsError

      // Add default time slots
      const { error: timeSlotsError } = await supabase.from("timeslots").insert([
        { start_time: "8:00 AM", end_time: "9:00 AM", user_id: userId },
        { start_time: "9:00 AM", end_time: "10:00 AM", user_id: userId },
        { start_time: "10:00 AM", end_time: "11:00 AM", user_id: userId },
        { start_time: "11:00 AM", end_time: "12:00 PM", user_id: userId },
        { start_time: "12:00 PM", end_time: "1:00 PM", user_id: userId },
        { start_time: "1:00 PM", end_time: "2:00 PM", user_id: userId },
      ])

      if (timeSlotsError) throw timeSlotsError

      console.log("Default data added successfully")
    } catch (error) {
      console.error("Error adding default data:", error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing up..." : "Sign up"}
          </Button>
        </form>
      </div>
    </div>
  )
}

