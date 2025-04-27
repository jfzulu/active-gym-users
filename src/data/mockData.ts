
import { GymUser } from "@/types/gym";

export const mockUsers: GymUser[] = [
  {
    id: "1",
    fullName: "Ana María González",
    phoneNumber: "555-0101",
    documentId: "12345678",
    membershipFee: 50000,
    lastPaymentDate: new Date("2025-03-15"),
    observations: "Clase de yoga los martes",
  },
  {
    id: "2",
    fullName: "Carlos Rodríguez",
    phoneNumber: "555-0202",
    documentId: "87654321",
    membershipFee: 45000,
    lastPaymentDate: new Date("2025-03-01"),
    observations: "Rutina de pesas",
  },
  {
    id: "3",
    fullName: "Laura Martínez",
    phoneNumber: "555-0303",
    documentId: "23456789",
    membershipFee: 55000,
    lastPaymentDate: new Date("2025-02-15"),
    observations: "Plan completo",
  },
];
