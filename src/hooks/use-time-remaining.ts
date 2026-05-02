import { useDateStore } from '#/store/date-store'
import { addYears, differenceInDays, intervalToDuration } from 'date-fns'
import { useEffect, useState } from 'react'

const WEEKS_IN_YEAR = 52
const DAYS_IN_WEEK = 7

const DEFAULT_TIME_REMAINING = {
  totalWeeks: 0,
  elapsedWeeks: 0,
  remainingWeeks: 0,
  remainingDays: 0,
  years: 0,
  months: 0,
  days: 0,
  seconds: 0,
  percentageOfWeeksRemaining: 0,
  weekGrid: [],
}

function getTimeRemaining(birthDate: Date, lifespanYears: number) {
  const now = new Date()
  const end = addYears(birthDate, lifespanYears)
  const duration = intervalToDuration({ start: now, end })
  const totalWeeks = lifespanYears * WEEKS_IN_YEAR
  const elapsedWeeks = Math.min(
    Math.max(Math.floor(differenceInDays(now, birthDate) / DAYS_IN_WEEK), 0),
    totalWeeks,
  )
  const remainingWeeks = Math.max(totalWeeks - elapsedWeeks, 0)
  const remainingDays = Math.max(differenceInDays(end, now), 0)
  const percentageOfWeeksRemaining =
    totalWeeks > 0 ? Math.round((remainingWeeks / totalWeeks) * 100) : 0

  return {
    totalWeeks,
    elapsedWeeks,
    remainingWeeks,
    remainingDays,
    years: duration.years ?? 0,
    months: duration.months ?? 0,
    days: duration.days ?? 0,
    seconds: duration.seconds ?? 0,
    percentageOfWeeksRemaining,
    weekGrid: Array.from({ length: totalWeeks }, (_, index) => ({
      index,
      week: (index % WEEKS_IN_YEAR) + 1,
      year: Math.floor(index / WEEKS_IN_YEAR),
    })),
  }
}

export function useTimeRemaining() {
  const birthDate = useDateStore((state) => state.birthDate)
  const lifespanYears = useDateStore((state) => state.lifespanYears)

  const [timeRemaining, setTimeRemaining] = useState(() =>
    birthDate
      ? getTimeRemaining(new Date(birthDate), lifespanYears)
      : DEFAULT_TIME_REMAINING,
  )

  useEffect(() => {
    if (!birthDate) {
      setTimeRemaining(DEFAULT_TIME_REMAINING)
      return
    }

    setTimeRemaining(getTimeRemaining(new Date(birthDate), lifespanYears))
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining(new Date(birthDate), lifespanYears))
    }, 1_000)

    return () => clearInterval(interval)
  }, [birthDate, lifespanYears])

  return timeRemaining
}
