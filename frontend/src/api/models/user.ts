export interface UserLogin {
  email: string;
  password: string;
}

type Role = 'teacher' | 'moderator';

export interface User {
  email: string;
  id: number;
  phone: string;
  role: Role;
}

export interface UserCreate {
  email: string;
  password: string;
  role: Role;
}
