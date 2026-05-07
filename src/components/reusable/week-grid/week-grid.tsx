import { GridSkeleton } from '#/components/skeleton/components/resusable/week-grid/week-grid-skeleton'
import type { Phase } from '#/context/week-grid/types'
import {
  getPhase,
  WeekGridContext,
} from '#/context/week-grid/week-grid-context'
import { cn } from '#/lib/utils'
import { usePhaseHeader } from '#/hooks/use-phase-header'
import { CircleDot } from 'lucide-react'
import { useContext } from 'react'
import { useDateStore } from '#/store/date-store'
import { getGridByPhase, getWeekGridConfig } from '#/hooks/use-time-remaining'
import { Badge } from '#/components/ui/badge'

interface WeekGridProps {
  children: React.ReactNode
  phase?: Phase
}

export function WeekGrid({ children, phase }: WeekGridProps) {
  return (
    <WeekGridContext value={{ phase }}>
      <div className="rounded-lg border bg-card">{children}</div>
    </WeekGridContext>
  )
}

WeekGrid.Grid = function Grid() {
  const birthDate = useDateStore((state) => state.birthDate)
  const lifespanYears = useDateStore((state) => state.lifespanYears)

  if (!birthDate) return <GridSkeleton />

  const { elapsedWeeks, weekGrid } = getWeekGridConfig(birthDate, lifespanYears)
  const combinedGrid = Object.values(weekGrid).flatMap((phaseGrid) => phaseGrid)

  return (
    <div className="overflow-y-auto overflow-x-hidden p-4">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(0.55rem,1fr))] mb-7 gap-1 sm:grid-cols-[repeat(auto-fill,minmax(0.7rem,1fr))] lg:grid-cols-52 lg:mb-0">
        {combinedGrid.map(({ index, week, year }) => {
          const isPast = index < elapsedWeeks
          const isCurrent = index === elapsedWeeks
          const isRemaining = !isPast && !isCurrent

          return (
            <span
              key={index}
              className={cn(
                'aspect-square rounded-xs',
                isPast && 'bg-muted-foreground/20',
                isCurrent && 'bg-primary ring-4 ring-primary/30 animate-pulse',
                isRemaining && 'bg-chart-2',
              )}
              title={`Year ${year}, week ${week}`}
              aria-label={`Year ${year}, week ${week}`}
            />
          )
        })}
      </div>
    </div>
  )
}

WeekGrid.PhaseGrid = function PhaseGrid() {
  const birthDate = useDateStore((state) => state.birthDate)
  const lifespanYears = useDateStore((state) => state.lifespanYears)
  const { phase } = useContext(WeekGridContext)

  if (!phase || !birthDate) return <GridSkeleton />

  const phaseConfig = getPhase(phase)
  const { elapsedWeeks, weekGrid } = getWeekGridConfig(birthDate, lifespanYears)
  const phaseGrid = getGridByPhase(phase, weekGrid)

  return (
    <div className="overflow-y-auto overflow-x-hidden p-4">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(0.55rem,1fr))] mb-7 gap-1 sm:grid-cols-[repeat(auto-fill,minmax(0.7rem,1fr))] lg:grid-cols-52 lg:mb-0">
        {phaseGrid.map(({ index, week, year }) => {
          const isPast = index < elapsedWeeks
          const isCurrent = index === elapsedWeeks
          const isRemaining = !isPast && !isCurrent

          return (
            <span
              key={index}
              className={cn(
                'aspect-square rounded-xs',
                isPast && phaseConfig.chartColor,
                isCurrent && 'bg-primary ring-4 ring-primary/30 animate-pulse',
                isRemaining && phaseConfig.chartColorFaded,
              )}
              title={`Year ${year}, week ${week}`}
              aria-label={`Year ${year}, week ${week}`}
            />
          )
        })}
      </div>
    </div>
  )
}

WeekGrid.Header = function Header() {
  return (
    <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
      <div className="flex items-center gap-2 text-sm font-medium">
        <CircleDot className="size-4 text-chart-3" aria-hidden="true" />
        Week map
      </div>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <span className="size-2 rounded-sm bg-muted-foreground/20" />
          Spent
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="size-2 rounded-sm bg-primary" />
          Now
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="size-2 rounded-sm bg-chart-2" />
          Ahead
        </span>
      </div>
    </div>
  )
}

WeekGrid.PhaseHeader = function PhaseHeader() {
  const data = usePhaseHeader()

  if (!data) return null

  const { phaseHeader, livedWeeksInPhase, statusText } = data

  return (
    <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
      <div className="flex items-center gap-2 text-sm font-medium">
        <div className={cn(`size-2 rounded-sm ${phaseHeader.chartColor}`)} />
        <span>{phaseHeader.title}</span>
        <div className="size-1 rounded-sm bg-muted-foreground/20" />
        <span className="text-xs text-muted-foreground">
          {phaseHeader.description}
        </span>
        {statusText === 'current' && (
          <Badge className="border-emerald-600/30 bg-emerald-500/10 text-emerald-700 shadow-[0_0_6px_1px_rgba(52,211,153,0.15)] dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-300 dark:shadow-[0_0_8px_2px_rgba(52,211,153,0.35)]">
            now
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          {livedWeeksInPhase} weeks lived
        </span>
        <div className="size-1 rounded-sm bg-muted-foreground/20" />
        <span className="inline-flex items-center gap-1 background">
          {statusText}
        </span>
      </div>
    </div>
  )
}
