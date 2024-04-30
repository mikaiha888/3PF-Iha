type CourseName = | 'Full Stack Development'
| 'Frontend Development'
| 'Backend Developer'
| 'UX Design'
| 'Marketing'
| 'Data Science';

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  cel: number;
  createdAt: Date;
  course: CourseName;
  classNumber: number | undefined;
  isApproved: boolean | undefined;
}
