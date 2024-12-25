export interface User {
  _id: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone?: string | number;
  address?: string;
  username: string;
  role: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
  refreshToken: string;
  avatar: string;
  rooms?: any[]; // Adjust the type as needed
  joinedRooms?: any[]; // Adjust the type as needed
}
