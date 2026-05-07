import { useDateStore } from '#/store/date-store'
import { differenceInDays, intervalToDuration } from 'date-fns'
import { useEffect, useState } from 'react'

function getTimePassed(birthDate: Date, lifespanYears: number) {
  const now = new Date()
  const duration = intervalToDuration({ start: birthDate, end: now })
  const totalDays = differenceInDays(now, birthDate)

  const percentLived = Math.min(
    ((duration.years ?? 0) / lifespanYears) * 100,
    100,
  )

  return {
    totalDays,
    years: duration.years ?? 0,
    months: duration.months ?? 0,
    weeks: duration.weeks ?? 0,
    days: duration.days ?? 0,
    seconds: duration.seconds ?? 0,
    percentLived: Math.round(percentLived),
  }
}

export function getDurationLived(birthDate: Date) {
  const duration = intervalToDuration({ start: birthDate, end: new Date() })
  return {
    years: duration.years,
    months: duration.months,
    weeks: duration.weeks,
    days: duration.days,
    seconds: duration.seconds,
  }
}

export function useTimePassed() {
  const birthDate = useDateStore((state) => state.birthDate)
  const lifespanYears = useDateStore((state) => state.lifespanYears)

  const [timePassed, setTimePassed] = useState(() =>
    birthDate ? getTimePassed(birthDate, lifespanYears) : null,
  )

  useEffect(() => {
    if (!birthDate) return

    setTimePassed(getTimePassed(birthDate, lifespanYears))
    const interval = setInterval(() => {
      setTimePassed(getTimePassed(birthDate, lifespanYears))
    }, 1_000)

    return () => clearInterval(interval)
  }, [birthDate, lifespanYears])

  return timePassed
}
