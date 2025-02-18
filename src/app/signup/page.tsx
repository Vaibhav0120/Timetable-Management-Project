"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        router.push("/");
      }
    };
    checkUser();
  }, [supabase, router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          phone_number: phoneNumber,
        },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      // Create default data for the new user
      await createDefaultUserData(data.user?.id);
      toast({
        title: "Success",
        description: "Check your email to confirm your account.",
      });
      router.push("/login");
    }
    setLoading(false);
  };

  const createDefaultUserData = async (userId: string | undefined) => {
    if (!userId) return;

    // Create default classes
    const { data: classesData, error: classesError } = await supabase
      .from("classes")
      .insert([
        { user_id: userId, name: "Branch CSE" },
        { user_id: userId, name: "Branch AIML" },
      ])
      .select();

    if (classesError) {
      console.error("Error creating default classes:", classesError);
      return;
    }

    // Create default sections for each class
    if (classesData) {
      const sectionsToInsert = classesData.flatMap((cls) => {
        if (cls.name === "Branch CSE") {
          return [
            { user_id: userId, class_id: cls.id, name: "CSE A" },
            { user_id: userId, class_id: cls.id, name: "CSE B" },
          ];
        } else if (cls.name === "Branch AIML") {
          return [{ user_id: userId, class_id: cls.id, name: "AIML A" }];
        }
        return [];
      });

      const { error: sectionsError } = await supabase
        .from("sections")
        .insert(sectionsToInsert);

      if (sectionsError) {
        console.error("Error creating default sections:", sectionsError);
      }
    }

    // Create default subjects
    const { data: subjectsData, error: subjectsError } = await supabase
      .from("subjects")
      .insert([
        { user_id: userId, name: "Data Structure (DS)" },
        { user_id: userId, name: "Python Programming (PP)" },
        { user_id: userId, name: "Maths IV" },
        { user_id: userId, name: "Technical Communication (TC)" },
        {
          user_id: userId,
          name: "Computer Organization and Architecture (COA)",
        },
      ])
      .select();

    if (subjectsError) {
      console.error("Error creating default subjects:", subjectsError);
      return;
    }

    // Create default teachers
    if (subjectsData) {
      const dataStructureSubject = subjectsData.find(
        (subject) => subject.name === "Data Structure (DS)"
      );
      const mathsIVSubject = subjectsData.find(
        (subject) => subject.name === "Maths IV"
      );

      const { error: teachersError } = await supabase.from("teachers").insert([
        {
          user_id: userId,
          name: "Vaibhav",
          subject_id: dataStructureSubject.id,
        },
        { user_id: userId, name: "Anirudh", subject_id: mathsIVSubject.id },
      ]);

      if (teachersError) {
        console.error("Error creating default teachers:", teachersError);
      }
    }

    // Create default time slots
    const { error: timeSlotsError } = await supabase.from("timeslots").insert([
      { user_id: userId, start_time: "09:05", end_time: "09:55" },
      { user_id: userId, start_time: "09:55", end_time: "10:45" },
      { user_id: userId, start_time: "10:45", end_time: "11:35" },
      { user_id: userId, start_time: "11:35", end_time: "12:25" },
      { user_id: userId, start_time: "12:25", end_time: "13:15" },
      { user_id: userId, start_time: "13:15", end_time: "14:05" },
      { user_id: userId, start_time: "14:05", end_time: "15:00" },
      { user_id: userId, start_time: "15:00", end_time: "15:55" },
      { user_id: userId, start_time: "15:55", end_time: "16:50" },
    ]);

    if (timeSlotsError) {
      console.error("Error creating default time slots:", timeSlotsError);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number (Optional)</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="Your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing up..." : "Sign up"}
          </Button>
        </form>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
