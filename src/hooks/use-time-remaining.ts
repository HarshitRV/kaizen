import type {
  GridBreakdown,
  GridConfig,
  Phase,
} from '#/context/week-grid/types'
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

export function getGridConfig(birthDate: Date, lifespanYears: number) {
  const now = new Date()
  const totalWeeks = lifespanYears * WEEKS_IN_YEAR
  const elapsedWeeks = Math.min(
    Math.max(Math.floor(differenceInDays(now, birthDate) / DAYS_IN_WEEK), 0),
    totalWeeks,
  )

  const remainingWeeks = Math.max(totalWeeks - elapsedWeeks, 0)
  const percentageOfWeeksRemaining =
    totalWeeks > 0 ? Math.round((remainingWeeks / totalWeeks) * 100) : 0

  const gridConfig = {
    totalWeeks,
    elapsedWeeks,
    remainingWeeks,
    percentageOfWeeksRemaining,
    weekGrid: Array.from({ length: totalWeeks }, (_, index) => {
      return {
        index,
        week: (index % WEEKS_IN_YEAR) + 1,
        year: Math.floor(index / WEEKS_IN_YEAR),
      }
    }),
  }

  return gridConfig
}

export function getWeekGridBreakdown(totalWeeks: number): GridBreakdown {
  const childhoodGrid: GridConfig[] = []
  const adolescenceGrid: GridConfig[] = []
  const adulthoodGrid: GridConfig[] = []
  const primeGrid: GridConfig[] = []
  const maturityGrid: GridConfig[] = []
  const elseGrid: GridConfig[] = []

  for (let index = 0; index < totalWeeks; index++) {
    const week = (index % WEEKS_IN_YEAR) + 1
    const year = Math.floor(index / WEEKS_IN_YEAR)
    const gridConfig: GridConfig = {
      index,
      week,
      year,
    }

    if (year <= 12) {
      childhoodGrid.push(gridConfig)
    } else if (year > 12 && year <= 20) {
      adolescenceGrid.push(gridConfig)
    } else if (year > 20 && year <= 35) {
      adulthoodGrid.push(gridConfig)
    } else if (year > 35 && year <= 55) {
      primeGrid.push(gridConfig)
    } else if (year > 55 && year <= 70) {
      maturityGrid.push(gridConfig)
    } else {
      elseGrid.push(gridConfig)
    }
  }

  return {
    childhoodGrid,
    adolescenceGrid,
    adulthoodGrid,
    primeGrid,
    maturityGrid,
    elseGrid,
  }
}

export function getGridByPhase(
  phase: Phase,
  weekGrid: GridBreakdown,
): GridConfig[] {
  switch (phase) {
    case 'childhood':
      return weekGrid.childhoodGrid
    case 'adolescence':
      return weekGrid.adolescenceGrid
    case 'adulthood':
      return weekGrid.adulthoodGrid
    case 'prime':
      return weekGrid.primeGrid
    case 'maturity':
      return weekGrid.maturityGrid
    case 'elder':
      return weekGrid.elseGrid
  }
}

const weekGridConfigCache: Map<
  string,
  { elapsedWeeks: number; weekGrid: GridBreakdown } | undefined
> = new Map()
export function getWeekGridConfig(birthDate: Date, lifespanYears: number) {
  const cacheKey = `${birthDate.toString()}-${lifespanYears}`

  if (weekGridConfigCache.has(cacheKey)) {
    return weekGridConfigCache.get(cacheKey) as {
      elapsedWeeks: number
      weekGrid: GridBreakdown
    }
  }

  const now = new Date()
  const totalWeeks = lifespanYears * WEEKS_IN_YEAR
  const elapsedWeeks = Math.min(
    Math.max(Math.floor(differenceInDays(now, birthDate) / DAYS_IN_WEEK), 0),
    totalWeeks,
  )

  const weekGridConfig = {
    elapsedWeeks,
    weekGrid: getWeekGridBreakdown(totalWeeks),
  }

  weekGridConfigCache.set(cacheKey, weekGridConfig)

  return weekGridConfig
}

export function getTimeRemaining(birthDate: Date, lifespanYears: number) {
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
  }
}

export function useTimeRemaining() {
  const birthDate = useDateStore((state) => state.birthDate)
  const lifespanYears = useDateStore((state) => state.lifespanYears)

  const [timeRemaining, setTimeRemaining] = useState(() =>
    birthDate
      ? getTimeRemaining(birthDate, lifespanYears)
      : DEFAULT_TIME_REMAINING,
  )

  useEffect(() => {
    if (!birthDate) {
      setTimeRemaining(DEFAULT_TIME_REMAINING)
      return
    }

    setTimeRemaining(getTimeRemaining(birthDate, lifespanYears))
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining(birthDate, lifespanYears))
    }, 1_000)

    return () => clearInterval(interval)
  }, [birthDate, lifespanYears])

  return timeRemaining
}
