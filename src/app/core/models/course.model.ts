type CourseName = | 'Full Stack Development'
| 'Frontend Development'
| 'Backend Developer'
| 'UX Design'
| 'Marketing'
| 'Data Science';

export interface Course {
    courseName: CourseName;
    classes: number[]
}