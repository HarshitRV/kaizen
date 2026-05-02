import { AVERAGE_LIFESPAN_YEARS } from '#/constants/constants'
import type { DateStore } from '#/types/store/date-store.types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useDateStore = create<DateStore>()(
  persist(
    (_set) => {
      return {
        birthDate: undefined,
        lifespanYears: AVERAGE_LIFESPAN_YEARS,
      }
    },
    {
      name: 'date-storage',
    },
  ),
)

export function setBirthDate(date: DateStore['birthDate']) {
  useDateStore.setState(() => ({ birthDate: date }))
}

export function setLifespanYears(years: number) {
  useDateStore.setState(() => ({
    lifespanYears: Math.max(1, Math.round(years)),
  }))
}
