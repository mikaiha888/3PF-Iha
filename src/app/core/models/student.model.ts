import { CourseName } from './course.model';

export type asistingCourse = {
  courseId: number;
  name: CourseName;
  classNumber?: number;
  isApproved?: boolean;
};

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  cel: number;
  createdAt: Date;
  course: asistingCourse;
}
