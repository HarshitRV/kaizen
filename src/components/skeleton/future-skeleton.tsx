import { MainContent } from '#/components/container/main-content/main-content'
import { Card, CardContent } from '#/components/ui/card'
import { Field, FieldLabel } from '#/components/ui/field'
import { Skeleton } from '#/components/ui/skeleton'

export function FutureSkeleton() {
  return (
    <MainContent className="justify-start gap-6 px-3 py-6 sm:px-6">
      <section className="flex w-full max-w-5xl flex-col items-center gap-4 text-center">
        <Skeleton className="h-7 w-20 self-start" />

        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-14 w-44 sm:h-20 sm:w-64" />
          <Skeleton className="h-4 w-48" />
        </div>

        <Field className="w-full max-w-2xl">
          <Skeleton className="h-2 w-full rounded-full" />
          <FieldLabel>
            <Skeleton className="h-3 w-10" />
            <span className="ml-auto">
              <Skeleton className="h-3 w-20" />
            </span>
            <span className="ml-auto">
              <Skeleton className="h-3 w-16" />
            </span>
          </FieldLabel>
        </Field>
      </section>

      <section className="grid w-full max-w-5xl grid-cols-1 gap-3 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} size="sm">
            <CardContent className="flex flex-col items-center gap-1 text-center">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-3 w-16" />
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="w-full max-w-5xl overflow-hidden rounded-lg border bg-card">
        <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-40" />
        </div>

        <div className="max-h-[52dvh] overflow-hidden p-4">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(0.55rem,1fr))] gap-1 sm:grid-cols-[repeat(auto-fill,minmax(0.7rem,1fr))] lg:grid-cols-52">
            {Array.from({ length: 5200 }).map((_, index) => (
              <Skeleton key={index} className="aspect-square rounded-xs" />
            ))}
          </div>
        </div>
      </section>
    </MainContent>
  )
}
