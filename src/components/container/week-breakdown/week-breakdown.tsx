import { WeekGrid } from '#/components/reusable/week-grid/week-grid'
import type { Phase } from '#/context/week-grid/types'
import { getGridByPhase, getWeekGridConfig } from '#/hooks/use-time-remaining'
import { useDateStore } from '#/store/date-store'

const ALL_PHASES: Phase[] = [
  'childhood',
  'adolescence',
  'adulthood',
  'prime',
  'maturity',
  'elder',
]

export function WeekBreakdown() {
  const birthDate = useDateStore((state) => state.birthDate)
  const lifespanYears = useDateStore((state) => state.lifespanYears)

  if (!birthDate) return null

  const { weekGrid } = getWeekGridConfig(birthDate, lifespanYears)
  const activePhases = ALL_PHASES.filter(
    (phase) => getGridByPhase(phase, weekGrid).length > 0,
  )

  return (
    <div className="flex flex-col gap-4">
      {activePhases.map((phase) => (
        <WeekGrid key={phase} phase={phase}>
          <WeekGrid.PhaseHeader />
          <WeekGrid.PhaseGrid />
        </WeekGrid>
      ))}
    </div>
  )
}
