# 📅 Timetable Management System

Efficiently manage classes, sections, teachers, and subjects while ensuring conflict-free timetable generation. Built with modern web technologies to provide a seamless user experience.

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

_Add screenshots of your application here to give visitors a visual overview of its features._

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Submit a pull request once your changes are complete.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## ✨ Acknowledgments

Special thanks to all contributors and open-source libraries that made this project possible.

---

### Example Repository Structure

```bash
timetable-management/
├── src/
│   ├── app/
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
│   └── styles/
│       └── globals.css
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
