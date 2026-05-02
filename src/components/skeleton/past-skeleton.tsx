import { MainContent } from '#/components/container/main-content/main-content'
import { Card, CardContent } from '#/components/ui/card'
import { Field, FieldLabel } from '#/components/ui/field'
import { Skeleton } from '#/components/ui/skeleton'

export function PastSkeleton() {
  return (
    <MainContent>
      {/* Hero: "DAYS ALREADY GONE" */}
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-16 min-[340px]:h-24 w-48 min-[340px]:w-72" />
        <Skeleton className="h-4 w-44" />
      </div>

      {/* Progress bar */}
      <Field className="w-3/4">
        <Skeleton className="h-2 w-full rounded-full" />
        <FieldLabel>
          <Skeleton className="h-3 w-10" />
          <span className="ml-auto">
            <Skeleton className="h-3 w-40" />
          </span>
          <span className="ml-auto">
            <Skeleton className="h-3 w-16" />
          </span>
        </FieldLabel>
      </Field>

      {/* Stat cards */}
      <div className="w-11/12 sm:w-3/4 grid grid-cols-2 md:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="flex flex-col items-center gap-2">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-4 w-14" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Button */}
      <Skeleton className="h-9 w-40 rounded-md" />
    </MainContent>
  )
}
