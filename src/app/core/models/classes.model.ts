import { Admin, CourseName } from ".";

export interface Classe {
  id: string;
  courseName: CourseName;
  classNumber: ClassNumber;
  day: DayOfWeek[];
  startTime: TimeFormat;
  endTime: TimeFormat;
  startDate: Date;
  endDate: Date;
  studentsId: string[];
  admin: Admin;
}

export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday';

export type TimeFormat = `${string}:${string}`;

export type ClassNumber = 101 | 202 | 303 | 404 | 505 | 606 | 707 | 808 | 909;
