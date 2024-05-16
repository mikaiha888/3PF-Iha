import { CourseName } from ".";

export interface Classe {
  id: string;
  courseName: CourseName;
  classNumber: ClassNumber;
  days: DayOfWeek[];
  startTime: TimeFormat;
  endTime: TimeFormat;
  startDate: Date;
  endDate: Date;
  studentsId: string[];
  adminId: string;
}

export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday';

export type TimeFormat = `${string}:${string}`;

export type ClassNumber = 101 | 202 | 303 | 404 | 505 | 606 | 707 | 808 | 909;
