export type CourseName =
  | 'Full Stack Development'
  | 'Frontend Development'
  | 'Backend Development'
  | 'UX Design'
  | 'Marketing'
  | 'Data Science'
  | 'Mobile App Development'
  | 'Game Development'
  | 'Cybersecurity';

export type CourseDifficulty =
  | 'Beginner'
  | 'Elementary'
  | 'Pre-intermediate'
  | 'Intermediate'
  | 'Upper-intermediate'
  | 'Advanced'
  | 'Proficiency'

export interface Course {
  id: number;
  name: CourseName;
  difficulty: CourseDifficulty;
  description: string;
  classesId: number[];
}
