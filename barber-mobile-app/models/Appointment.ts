export interface Appointment {
  id: number;
  customerName: string;
  creationDate: Date;
  dueDate: Date;
  isPending: boolean;
}
