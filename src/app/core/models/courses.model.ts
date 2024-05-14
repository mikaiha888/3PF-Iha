export interface Course {
  id: string;
  name: CourseName;
  description: string;
  difficulty: CourseDifficulty;
  classes: number[];
}

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

export type CourseDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';