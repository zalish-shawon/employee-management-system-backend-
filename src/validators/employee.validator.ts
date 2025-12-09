import { z } from 'zod';

export const createEmployeeSchema = {
  body: z.object({
    userId: z.string().optional(),
    employeeId: z.string().min(1),
    position: z.string().optional(),
    department: z.string().optional(),
    dateOfJoining: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    salary: z.number().optional()
  })
};
