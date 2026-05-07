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
      storage: {
        getItem: (name) => {
          const raw = localStorage.getItem(name)
          if (!raw) return null
          const parsed = JSON.parse(raw)
          // Rehydrate birthDate from ISO string back to a Date instance
          if (parsed?.state?.birthDate) {
            parsed.state.birthDate = new Date(parsed.state.birthDate)
          }
          return parsed
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value))
        },
        removeItem: (name) => {
          localStorage.removeItem(name)
        },
      },
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
