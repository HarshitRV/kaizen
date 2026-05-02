import * as React from 'react'
import { Progress as ProgressPrimitive } from 'radix-ui'

import { cn } from '#/lib/utils'

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> & {
  align?: 'start' | 'end'
  indicatorClassName?: string
}

function Progress({
  align = 'start',
  className,
  indicatorClassName,
  value,
  ...props
}: ProgressProps) {
  const translate = 100 - (value || 0)

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        'relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          'size-full flex-1 bg-primary transition-all',
          indicatorClassName,
        )}
        style={{
          transform:
            align === 'end'
              ? `translateX(${translate}%)`
              : `translateX(-${translate}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
