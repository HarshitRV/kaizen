import { MainContent } from '#/components/container/main-content/main-content'
import { EditableLifespan } from '#/components/editable-lifespan/editable-lifespan'
import { FutureSkeleton } from '#/components/skeleton/future-skeleton'
import { Button } from '#/components/ui/button'
import { Card, CardContent } from '#/components/ui/card'
import { Field, FieldLabel } from '#/components/ui/field'
import { Progress } from '#/components/ui/progress'
import { useTimeRemaining } from '#/hooks/use-time-remaining'
import { seo } from '#/utils/seo'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { WeekGrid } from '#/components/reusable/week-grid/week-grid'
import { WeekBreakdown } from '#/components/container/week-breakdown/week-breakdown'
import { ButtonGroup } from '#/components/ui/button-group'
import { useState } from 'react'
import { useAppForm } from '#/components/ui/app-form'
import { z } from 'zod'
import {
  setBirthDate,
  setLifespanYears,
  useDateStore,
} from '#/store/date-store'
import { getDurationLived } from '#/hooks/use-time-passed'
import { subYears } from 'date-fns'

const gridSliderConfigSchema = z.object({
  age: z.array(z.number().min(1).max(120)).length(1),
  lifeExpectancy: z.array(z.number().min(1).max(120)).length(1),
})

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
  return (
    <MainContent className="justify-start gap-4 px-3 py-6 sm:px-6">
      <MetricsSections />
      <GridSection />
    </MainContent>
  )
}

function MetricsSections() {
  const future = useTimeRemaining()

  const metrics = [
    { label: 'WEEKS LEFT', value: future.remainingWeeks.toLocaleString() },
    { label: 'DAYS LEFT', value: future.remainingDays.toLocaleString() },
    { label: 'TIME AHEAD', value: `${future.percentageOfWeeksRemaining}%` },
  ]

  return (
    <>
      <section className="hidden sm:flex w-full max-w-5xl flex-col items-center gap-4 text-center">
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

      <section className="hidden sm:grid w-full max-w-5xl grid-cols-1 gap-3 sm:grid-cols-3">
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
    </>
  )
}

function SettingsSection() {
  const birthDate = useDateStore((state) => state.birthDate)
  const lifespanYears = useDateStore((state) => state.lifespanYears)

  const form = useAppForm({
    defaultValues: {
      age: [birthDate ? getDurationLived(birthDate).years : 24],
      lifeExpectancy: [lifespanYears],
    },
    validators: {
      onChange: gridSliderConfigSchema,
    },
  })

  return (
    <div className="w-full max-w-5xl space-y-6">
      {!birthDate && (
        <div className="rounded-md border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
          Please set your birth date on the{' '}
          <Link
            to="/"
            className="text-primary underline underline-offset-4 hover:text-primary/80"
          >
            home page
          </Link>{' '}
          to interact with below settings.
        </div>
      )}
      <section
        className={`flex w-full flex-col gap-12 lg:flex-row ${!birthDate ? 'pointer-events-none opacity-50 grayscale' : ''}`}
      >
        <form.AppField
          name="age"
          children={(field) => (
            <field.RangeField
              label="Age"
              min={0}
              max={120}
              step={1}
              disabled={!birthDate}
              onValueChange={(value) => {
                field.handleChange(value)
                setBirthDate(subYears(new Date(), value[0]))
              }}
            />
          )}
        />
        <form.AppField
          name="lifeExpectancy"
          children={(field) => (
            <field.RangeField
              label="Life expectancy"
              min={1}
              max={120}
              step={1}
              disabled={!birthDate}
              onValueChange={(value) => {
                field.handleChange(value)
                setLifespanYears(value[0])
              }}
            />
          )}
        />
      </section>
    </div>
  )
}

function GridSection() {
  const [view, setView] = useState<'unified' | 'by-phase'>('by-phase')

  return (
    <>
      <section className="w-full max-w-5xl flex flex-col lg:flex-row gap-12">
        <SettingsSection />
      </section>
      <section className="flex w-full max-w-5xl justify-end gap-4 text-center">
        <ButtonGroup>
          <Button
            className={
              view === 'unified'
                ? 'bg-chart-4'
                : 'bg-muted text-black dark:text-foreground'
            }
            onClick={() => setView('unified')}
          >
            Unified
          </Button>
          <Button
            className={
              view === 'by-phase'
                ? 'bg-chart-4'
                : 'bg-muted text-black dark:text-foreground'
            }
            onClick={() => setView('by-phase')}
          >
            By phase
          </Button>
        </ButtonGroup>
      </section>
      <section
        key={view}
        className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-3 duration-500 ease-out"
      >
        {view === 'unified' && (
          <WeekGrid>
            <WeekGrid.Header />
            <WeekGrid.Grid />
          </WeekGrid>
        )}
        {view === 'by-phase' && <WeekBreakdown />}
      </section>
    </>
  )
}
