import { z } from 'zod'

export const lifespanYearsSchema = z.number().min(1).max(100)

export const dateStoreSchema = z.object({
  birthDate: z.date().optional(),
  lifespanYears: lifespanYearsSchema,
})
export type DateStore = z.infer<typeof dateStoreSchema>
