import { Role } from './role';

export interface UserLogin {
  email: string;
  password: string;
}

export interface Survey {
  id: number;
  name: string;
  description: string;
  questions_quantity: number;
}

export interface User {
  email: string;
  id: number;
  phone: string;
  role: Role;
}

export interface UserCreate {
  email: string;
  password: string;
  role_id: number;
}

export interface UserFilters {
  role_id: number;
}
