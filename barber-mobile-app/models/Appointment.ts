import { Barber } from "./Barber";
import { Customer } from "./Customer";
import { Service } from "./Service";

export interface Appointment {
  id: number;
  customer: Customer;
  status: APPOINTMENT_STATUS;
  isConfirmed: boolean;
  creationDate: Date;
  date: Date;
  services: Service[];
  isPaid: boolean;
  paymentMethod?: "CASH" | "TRANSFER" | "CREDIT_CARD";
  barber: Barber;
  paidAmount?: number;
}

enum APPOINTMENT_STATUS {
  "PENDING_APPROVAL",
  "APPROVED",
  "PENDING",
  "ATTENDING",
  "LATE",
  "DONE",
}
