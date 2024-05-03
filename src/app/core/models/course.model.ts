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

export enum CourseDifficulty {
  Beginner = "Beginner",
  Elementary = "Elementary",
  PreIntermediate = "Pre-intermediate",
  Intermediate = "Intermediate",
  UpperIntermediate = "Upper-intermediate",
  Advanced = "Advanced",
  Proficiency = "Proficiency"
}

export interface Course {
  id: number;
  name: CourseName;
  difficulty: CourseDifficulty;
  description: string;
  classIds: number[];
}
