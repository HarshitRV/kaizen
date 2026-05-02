import { MainContent } from '#/components/container/main-content/main-content'
import { EditableLifespan } from '#/components/editable-lifespan/editable-lifespan'
import { FutureSkeleton } from '#/components/skeleton/future-skeleton'
import { Button } from '#/components/ui/button'
import { Card, CardContent } from '#/components/ui/card'
import { Field, FieldLabel } from '#/components/ui/field'
import { Progress } from '#/components/ui/progress'
import { useTimeRemaining } from '#/hooks/use-time-remaining'
import { seo } from '#/utils/seo'
import { cn } from '#/lib/utils'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, CircleDot } from 'lucide-react'

export const Route = createFileRoute('/future')({
  head: () => ({
    meta: seo({
      title: 'Your Weeks Ahead — Kaizen',
      description:
        'See the remaining weeks ahead of you as a simple grid, based on your birthday and expected lifespan.',
    }),
  }),
  component: RouteComponent,
  pendingComponent: FutureSkeleton,
  ssr: false,
})

function RouteComponent() {
  const future = useTimeRemaining()
  const metrics = [
    { label: 'WEEKS LEFT', value: future.remainingWeeks.toLocaleString() },
    { label: 'DAYS LEFT', value: future.remainingDays.toLocaleString() },
    { label: 'TIME AHEAD', value: `${future.percentageOfWeeksRemaining}%` },
  ]

  return (
    <MainContent className="justify-start gap-6 px-3 py-6 sm:px-6">
      <section className="flex w-full max-w-5xl flex-col items-center gap-4 text-center">
        <Button asChild variant="ghost" size="sm" className="self-start">
          <Link to="/past">
            <ArrowLeft aria-hidden="true" />
            Past
          </Link>
        </Button>

        <div className="flex flex-col items-center gap-2">
          <p className="text-sm tracking-wide text-muted-foreground uppercase">
            Weeks still yours
          </p>
          <h1 className="text-5xl font-bold text-chart-4 sm:text-7xl">
            {future.remainingWeeks.toLocaleString()}
          </h1>
          <p className="text-sm text-muted-foreground">
            out of {future.totalWeeks.toLocaleString()} planned weeks
          </p>
        </div>

        <Field className="w-full max-w-2xl">
          <Progress
            align="end"
            value={future.percentageOfWeeksRemaining}
            className="h-2 bg-muted-foreground/20"
            indicatorClassName="bg-chart-2"
          />
          <FieldLabel>
            <span>spent</span>
            <span className="ml-auto">
              <span className="text-chart-1">
                {future.percentageOfWeeksRemaining}
                {'%'}
              </span>{' '}
              ahead
            </span>
            <EditableLifespan />
          </FieldLabel>
        </Field>
      </section>

      <section className="grid w-full max-w-5xl grid-cols-1 gap-3 sm:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.label} size="sm">
            <CardContent className="flex flex-col items-center gap-1 text-center">
              <span className="text-2xl font-semibold sm:text-3xl">
                {metric.value}
              </span>
              <span className="text-xs tracking-wide text-muted-foreground">
                {metric.label}
              </span>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="w-full max-w-5xl overflow-hidden rounded-lg border bg-card">
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

        <div className="max-h-[52dvh] overflow-y-auto overflow-x-hidden p-4">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(0.55rem,1fr))] mb-7 gap-1 sm:grid-cols-[repeat(auto-fill,minmax(0.7rem,1fr))] lg:grid-cols-52 lg:mb-0">
            {future.weekGrid.map(({ index, week, year }) => {
              const isPast = index < future.elapsedWeeks
              const isCurrent = index === future.elapsedWeeks
              const isRemaining = !isPast && !isCurrent

              return (
                <span
                  key={index}
                  className={cn(
                    'aspect-square rounded-xs',
                    isPast && 'bg-muted-foreground/20',
                    isCurrent && 'bg-primary ring-2 ring-primary/30',
                    isRemaining && 'bg-chart-2',
                  )}
                  title={`Year ${year}, week ${week}`}
                  aria-label={`Year ${year}, week ${week}`}
                />
              )
            })}
          </div>
        </div>
      </section>
    </MainContent>
  )
}
