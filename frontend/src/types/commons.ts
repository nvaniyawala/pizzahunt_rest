export type HttpMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type Roles = "" | "customer" | "deliveryPerson" | "admin" | "restaurant";
export type PaymentMethod = "CASH" | "CREDIT";
export type OrderStatus =
  | "IN_TRANSIT"
  | "DELIVERED"
  | "PREPARING"
  | "CANCELLED"
  | "PLACED";
