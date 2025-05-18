export interface Customer {
  id: number;
  name: string;
  alias?: string;
}

export type AppointmentSelectedCustomer = Pick<Customer, "id" | "name" | "alias">;
