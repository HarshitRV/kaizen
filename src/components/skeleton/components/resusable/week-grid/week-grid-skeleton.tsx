import { Skeleton } from '#/components/ui/skeleton'

export function GridSkeleton() {
  return (
    <div className="overflow-y-auto overflow-x-hidden p-4">
      <Skeleton
        className="w-full min-h-[250px] lg:min-h-[180px] rounded-md opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(to right, transparent 88%, var(--background) 88%),
            linear-gradient(to bottom, transparent 88%, var(--background) 88%)
          `,
          backgroundSize: '1.2rem 1.2rem',
        }}
      />
    </div>
  )
}
