import { Student } from "./student.model";

export type Schedule = {
    monday?: boolean;
    tuesday?: boolean;
    wednesday?: boolean;
    thursday?: boolean;
    friday?: boolean;
};

export type TimeFormat = `${string}:${string}`;

export interface Class {
    id: number;
    courseId: number;
    classNumber: number;
    day: Schedule;
    time: TimeFormat;
    startDate: Date;
    endDate: Date;
    students: Student[];
}