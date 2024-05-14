export type UserRole = 'ADMIN' | 'STUDENT';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cel: number;
  createdAt: Date;
  role: UserRole;
}
