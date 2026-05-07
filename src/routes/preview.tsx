import { MainContent } from '#/components/container/main-content/main-content'
import { WeekGrid } from '#/components/reusable/week-grid/week-grid'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/preview')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <MainContent className="justify-start gap-6 px-3 py-6 sm:px-6">
      <WeekGrid phase="childhood">
        <WeekGrid.PhaseHeader />
        <WeekGrid.PhaseGrid />
      </WeekGrid>
      <WeekGrid phase="adolescence">
        <WeekGrid.PhaseHeader />
        <WeekGrid.PhaseGrid />
      </WeekGrid>
      <WeekGrid phase="adulthood">
        <WeekGrid.PhaseHeader />
        <WeekGrid.PhaseGrid />
      </WeekGrid>
      <WeekGrid phase="prime">
        <WeekGrid.PhaseHeader />
        <WeekGrid.PhaseGrid />
      </WeekGrid>
      <WeekGrid phase="maturity">
        <WeekGrid.PhaseHeader />
        <WeekGrid.PhaseGrid />
      </WeekGrid>
      <WeekGrid phase="elder">
        <WeekGrid.PhaseHeader />
        <WeekGrid.PhaseGrid />
      </WeekGrid>
    </MainContent>
  )
}
