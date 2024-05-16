import { User, CourseName, ClassNumber } from ".";

export interface Admin extends User{
    courseName: CourseName | null;
    classNumber: ClassNumber | null
  }