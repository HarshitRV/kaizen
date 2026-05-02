import { setBirthDate, useDateStore } from '#/store/date-store'
import { dateStoreSchema } from '#/types/store/date-store.types'
import type { DateStore } from '#/types/store/date-store.types'
import { useAppForm } from '#/components/ui/app-form'
import { Button } from '#/components/ui/button'
import { Link } from '@tanstack/react-router'
import { ArrowRightIcon } from 'lucide-react'
import { cn } from '#/lib/utils'

export function DateForm() {
  const birthDate = useDateStore((state) => state.birthDate)

  const defaultValues: {
    birthDate?: DateStore['birthDate']
  } = {
    birthDate,
  }

  const form = useAppForm({
    defaultValues,
    validators: {
      onMount: dateStoreSchema,
    },
  })

  return (
    <form
      className="w-full flex flex-col items-center justify-center gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <form.AppField
        name="birthDate"
        listeners={{
          onChange: ({ value }) => {
            if (value) {
              setBirthDate(value)
            }
          },
        }}
        children={(field) => (
          <field.DateField
            placeholder="When did your clock start ?"
            className="w-2/3"
          />
        )}
      />

      <Button
        asChild
        disabled={!birthDate}
        className={cn(!birthDate && 'opacity-50 cursor-not-allowed')}
      >
        <Link to="/past" className="flex items-center gap-2">
          Show me my time <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </Button>
    </form>
  )
}
