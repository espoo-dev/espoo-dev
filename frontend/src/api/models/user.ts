export interface UserLogin {
  email: string;
  password: string;
}

type RoleType = 'teacher' | 'admin' | 'moderator';

interface Role {
  id: number;
  role_type: RoleType;
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
  role: number;
}

export interface UserFilters {
  role_id: number;
}
