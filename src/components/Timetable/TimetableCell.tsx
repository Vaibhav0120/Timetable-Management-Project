import React from "react";
import { TableCell } from "@/components/ui/table";
import { TimeTableEntry, Teacher, Subject } from "../../types";
import { getTeacherName, getSubjectName } from "../../utils/helpers";

interface TimetableCellProps {
  entry: TimeTableEntry | undefined;
  teachers: Teacher[];
  subjects: Subject[];
  onClick: () => void;
}

export const TimetableCell: React.FC<TimetableCellProps> = ({
  entry,
  teachers,
  subjects,
  onClick,
}) => {
  return (
    <TableCell className="cursor-pointer hover:bg-gray-100" onClick={onClick}>
      {entry && entry.teacherId !== 0 ? (
        <>
          <div>{getSubjectName(entry.teacherId, teachers, subjects)}</div>
          <div>{getTeacherName(entry.teacherId, teachers)}</div>
        </>
      ) : (
        "-"
      )}
    </TableCell>
  );
};
