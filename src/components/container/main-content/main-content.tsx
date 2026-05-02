import { cn } from '#/lib/utils'

interface MainContentProps {
  children: React.ReactNode
  className?: string
}

/** Styled wrapper for main content */
export function MainContent({ children, className }: MainContentProps) {
  return (
    <main
      className={cn(
        'min-h-0 w-full flex-1 overflow-y-auto p-2 flex flex-col items-center justify-center gap-4',
        className,
      )}
    >
      {children}
    </main>
  )
}
