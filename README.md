# 📅 Timetable Management System

Efficiently manage classes, sections, teachers, and subjects while ensuring conflict-free timetable generation. Built with modern web technologies to provide a seamless user experience.

[Watch It Live](https://timetable-management-project.vercel.app/)

Note: This project uses [Supabase](https://supabase.com/) for database and authentication services. On the free tier, Supabase projects become **paused after 15 days of inactivity**. During this time, the backend (database and auth) stops functioning, which may result in **login or data fetching issues**.

## 🚀 Features

- 🏫 **Manage Classes and Sections**Add, edit, and delete classes and sections to keep the system organized.
- 👩‍🏫 **Manage Teachers and Subjects**Assign subjects to teachers and manage their availability effortlessly.
- ⏰ **Create and Edit Time Slots**Customize time slots to suit your institution's needs.
- 📊 **Generate Timetables**Automatically generate timetables for each class and section.
- ⚠️ **Conflict Detection**
  Ensure no teacher is double-booked or assigned overlapping schedules.

---

## 🛠️ Technologies Used

- **Frontend Framework:** [Next.js](https://nextjs.org/)
- **UI Library:** [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.dev/)
- **eDatabase/Authentication:** [Supabase](https://supabase.com/)

---

## 📂 Project Structure

### **Main Components**

- **`TimetableManagement`**:Orchestrates the application's functionality.
- **`ClassSectionSelector`**:Allows users to select and view specific classes and sections.
- **`ClassSectionManager`**:Manages the addition, editing, and deletion of classes and sections.
- **`TeacherSubjectManager`**:Handles the assignment of subjects to teachers and their availability.
- **`TimeSlotManager`**:Enables creating and editing custom time slots.
- **`TimetableGrid`**:
  Displays and allows editing of the timetable for each class and section.

### **Custom Hooks**

The application employs custom React hooks to manage the state of various entities:

- **`useClasses`**: Manages class-related state.
- **`useTeachers`**: Manages teacher-related state.
- **`useSubjects`**: Manages subject-related state.
- **`useTimeSlots`**: Handles time slot data.
- **`useTimetable`**: Facilitates timetable creation and conflict detection.

---

## 🔧 Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- npm or yarn installed

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Vaibhav0120/timetable-management.git
   cd timetable-management
   ```
2. **Install Dependencies**

   ```bash
   npm install
   ```
   ```bash
   npm install next@latest react@latest react-dom@latest
   ```

3. **Run the Development Server**

   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🖥️ Screenshots
<p align="center">
<img src="https://github.com/user-attachments/assets/f2486379-f51c-4387-9e1d-8934334ad324" width="550">
<img src="https://github.com/user-attachments/assets/79a38269-726c-4680-ac12-378c72c29d8b" width="550">
<img src="https://github.com/user-attachments/assets/b8aaf8d1-aae5-4f2f-99ec-9fbe06c5af85" width="550">
<img src="https://github.com/user-attachments/assets/247a3df8-dd4e-43df-9cae-2876bde36b9e" width="550">
<img src="https://github.com/user-attachments/assets/1d955290-ad36-45a5-a5e3-613095e3ed83" width="550">
<img src="https://github.com/user-attachments/assets/9477b4f6-a9ff-4240-8a0e-1748f9c15a10" width="550">
</p>

---

### Example Repository Structure

```bash
timetable-management/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   └── callback
│   │   │       └── route.ts
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ClassSection/
│   │   │   ├── ClassSectionManager.tsx
│   │   │   └── ClassSectionSelector.tsx
│   │   ├── TeacherSubject/
│   │   │   └── TeacherSubjectManager.tsx
│   │   ├── TimeSlot/
│   │   │   ├── TimeSlotEditor.tsx
│   │   │   └── TimeSlotManager.tsx
│   │   ├── Timetable/
│   │   │   ├── TimetableCell.tsx
│   │   │   └── TimetableGrid.tsx
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   └── use-toast.ts
│   │   └── TimetableManagement.tsx
│   ├── hooks/
│   │   ├── useClasses.ts
│   │   ├── useSubjects.ts
│   │   ├── useTeachers.ts
│   │   ├── useTimeSlots.ts
│   │   └── useTimetable.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── helpers.ts
│   ├── styles/
│   │   └── globals.css
│   └── middleware.ts
├── public/
│   └── favicon.ico
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── README.md
├── tailwind.config.js
└── tsconfig.json
```
