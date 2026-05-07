import {
  getPhase,
  WeekGridContext,
} from '#/context/week-grid/week-grid-context'
import { getGridByPhase, getWeekGridConfig } from '#/hooks/use-time-remaining'
import { useDateStore } from '#/store/date-store'
import { useContext } from 'react'
import type { GridConfig } from '#/context/week-grid/types'

export function getPhaseStatus(
  phaseGrid: GridConfig[],
  elapsedWeeks: number,
): {
  livedWeeksInPhase: number
  totalWeeksInPhase: number
  statusText: 'current' | 'fully past' | 'left'
} {
  const livedWeeksInPhase = phaseGrid.filter(
    (cell) => cell.index < elapsedWeeks,
  ).length
  const totalWeeksInPhase = phaseGrid.length

  let statusText: 'current' | 'fully past' | 'left' = 'current'
  if (livedWeeksInPhase === totalWeeksInPhase) {
    statusText = 'fully past'
  } else if (livedWeeksInPhase === 0) {
    statusText = 'left'
  }

  return { livedWeeksInPhase, totalWeeksInPhase, statusText }
}

export function usePhaseHeader() {
  const { phase } = useContext(WeekGridContext)
  const birthDate = useDateStore((state) => state.birthDate)
  const lifespanYears = useDateStore((state) => state.lifespanYears)

  if (!phase || !birthDate) return null

  const phaseHeader = getPhase(phase)
  const { elapsedWeeks, weekGrid } = getWeekGridConfig(birthDate, lifespanYears)
  const phaseGrid = getGridByPhase(phase, weekGrid)
  const { livedWeeksInPhase, statusText } = getPhaseStatus(
    phaseGrid,
    elapsedWeeks,
  )

  return { phaseHeader, livedWeeksInPhase, statusText }
}
