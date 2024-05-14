import { User, CourseName, ClassNumber } from '.';

export interface Student extends User {
  courseName: CourseName;
  classNumber: ClassNumber;
  isApproved?: boolean;
}
