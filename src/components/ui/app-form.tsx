import { createFormHookContexts, createFormHook } from '@tanstack/react-form'
import { Field, FieldError, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { ChevronDownIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '#/lib/utils'

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

export function TextField({
  label,
  placeholder,
  required = false,
  type = 'text',
  description,
  autoComplete,
}: {
  label: React.ReactNode
  placeholder?: string
  required?: boolean
  type?: React.HTMLInputTypeAttribute
  description?: React.ReactNode
  autoComplete?: string
}) {
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field>
      <FieldLabel htmlFor={field.name}>
        {label} {required && <span className="text-destructive">*</span>}
      </FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        type={type}
        value={field.state.value || ''}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
      />
      {description && (
        <div className="text-muted-foreground text-sm">{description}</div>
      )}
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}

interface DateFieldProps {
  /** Placeholder text shown when no date is selected */
  placeholder?: string
  /** Date format string (date-fns format) */
  dateFormat?: string
  /** Popover alignment relative to the trigger */
  align?: 'start' | 'center' | 'end'
  /** Additional class names for the trigger button */
  className?: string
  /** Whether the input is disabled */
  disabled?: boolean
}

export function DateField({
  placeholder,
  dateFormat,
  align,
  className,
  disabled,
}: DateFieldProps) {
  const field = useFieldContext<Date | undefined>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field className={cn(className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={field.name}
            disabled={disabled}
            data-empty={!field.state.value}
            className={cn(
              'justify-between text-left font-normal data-[empty=true]:text-muted-foreground',
            )}
          >
            {field.state.value ? (
              format(field.state.value, dateFormat ?? 'PPP')
            ) : (
              <span>{placeholder}</span>
            )}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align={align}>
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={field.state.value}
            onSelect={field.handleChange}
            defaultMonth={field.state.value}
          />
        </PopoverContent>
      </Popover>
      {isInvalid && <FieldError errors={field.state.meta.errors[0]} />}
    </Field>
  )
}

interface SubscribeButtonProps {
  children: React.ReactNode
  className?: string
  asChild?: boolean
}

function SubscribeButton({
  children,
  className,
  asChild,
}: SubscribeButtonProps) {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]) => {
        return (
          <Button
            asChild={asChild}
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className={cn(
              className,
              !canSubmit && 'opacity-50 cursor-not-allowed',
            )}
          >
            {children}
          </Button>
        )
      }}
    </form.Subscribe>
  )
}

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    DateField,
  },
  formComponents: {
    SubscribeButton,
  },
})
