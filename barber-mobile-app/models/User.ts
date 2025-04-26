export interface User {
  id: number;
  userId: number;
  role: "BARBER" | "CUSTOMER";
  password: string;
  confirmedPassowrd: string;
  email?: string;
  loginCount: number;
  lastLoginDate: Date;
  isBanned: boolean;
  phoneNumber: string;
  isFirstLogin: boolean;
}
