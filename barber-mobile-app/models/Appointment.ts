import { Customer } from "./Customer";

export interface Appointment {
  id: number;
  customer: Customer;
  createdAt: Date;
  startDate: Date;
  completedDate?: Date;
  cancelledDate?: Date;
  completedBy?: number;
}

export interface CreateAppointmentDto {
  customerId: number;
  startDate: Date;
  createdBy: number;
  isPaid: boolean;
  serviceId: number;
}
