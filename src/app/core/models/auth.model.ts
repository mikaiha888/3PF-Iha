export interface User {
  id: string;
  firstName: string;
  lastName: string;
  cel: number;
  email: string;
  password: string;
  createdAt: Date;
  role: UserRole;
}

export type UserRole = 'ADMIN' | 'STUDENT';