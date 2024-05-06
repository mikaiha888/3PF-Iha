import { Student } from "./student.model";

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

export type ClassNumber = 101 | 202 | 303 | 404 | 505 | 606 | 707 | 808 | 909

export type TimeFormat = `${string}:${string}`;

export interface Classe {
    id: number;
    courseId: number;
    classNumber: ClassNumber;
    day: DayOfWeek[];
    startTime: TimeFormat;
    endTime: TimeFormat;
    startDate: Date;
    endDate: Date;
    students: Student[];
}