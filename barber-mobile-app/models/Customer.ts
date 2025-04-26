export interface Customer {
  id: number;
  name: string;
  phoneNumber?: string;
  email?: string;
  creationDate: Date;
  gender: "M" | "F";
}
