import { MainContent } from '#/components/container/main-content/main-content'
import { PastSkeleton } from '#/components/skeleton/past-skeleton'
import { Button } from '#/components/ui/button'
import { Card, CardContent } from '#/components/ui/card'
import { Field, FieldLabel } from '#/components/ui/field'
import { Progress } from '#/components/ui/progress'
import { useTimePassed } from '#/hooks/use-time-passed'
import { EditableLifespan } from '#/components/editable-lifespan/editable-lifespan'
import { seo } from '#/utils/seo'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/past')({
  head: () => ({
    meta: seo({
      title: 'Your Life So Far — Kaizen',
      description:
        'See the days, months, and years that have already passed since you were born. A powerful visual of how far you have come — and how much is left.',
    }),
  }),
  component: RouteComponent,
  pendingComponent: PastSkeleton,
  ssr: false,
})

function RouteComponent() {
  const timePassed = useTimePassed()

  const data = [
    { label: 'YEARS', value: timePassed?.years ?? 0 },
    { label: 'MONTHS', value: timePassed?.months ?? 0 },
    { label: 'DAYS', value: timePassed?.days ?? 0 },
    { label: 'SECONDS', value: timePassed?.seconds ?? 0 },
  ]

  return (
    <MainContent>
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm">DAYS ALREADY GONE</p>
        <h1 className="text-6xl min-[340px]:text-8xl text-primary">
          {timePassed ? timePassed.totalDays.toLocaleString() : '—'}
        </h1>
        <p className="text-sm">since the day you were born</p>
      </div>
      <Field className="w-3/4">
        <Progress value={timePassed?.percentLived ?? 0} />
        <FieldLabel>
          <span>born</span>
          <span className="ml-auto text-center">
            <span className="text-primary font-bold block">
              {timePassed?.percentLived ?? 0}
              {'%'}
            </span>{' '}
            of average life spent
          </span>
          <EditableLifespan />
        </FieldLabel>
      </Field>
      <div className="w-11/12 sm:w-3/4 grid grid-cols-2 md:grid-cols-4 gap-3">
        {data.map((item, index) => (
          <Card key={index}>
            <CardContent className="flex flex-col items-center gap-2">
              <span className="text-xl sm:text-2xl md:text-3xl">
                {item.value}
              </span>
              <span className="text-xs sm:text-sm">{item.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button asChild className="bg-chart-3 hover:bg-chart-4">
        <Link to="/future">
          See whats ahead <ArrowRight className="inline" />
        </Link>
      </Button>
    </MainContent>
  )
}
