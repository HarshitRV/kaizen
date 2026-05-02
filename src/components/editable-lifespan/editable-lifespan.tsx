import { useDateStore, setLifespanYears } from '#/store/date-store'
import { useRef, useState } from 'react'

/**
 * An inline-editable number that looks like regular text.
 * Click to edit, blur/Enter to commit. Value is always ≥ 1.
 */
export function EditableLifespan() {
  const lifespanYears = useDateStore((state) => state.lifespanYears)
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(String(lifespanYears))
  const inputRef = useRef<HTMLInputElement>(null)

  function startEditing() {
    setDraft(String(lifespanYears))
    setIsEditing(true)
    // Focus after React renders the input
    requestAnimationFrame(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })
  }

  function commit() {
    const parsed = parseInt(draft, 10)
    if (!isNaN(parsed) && parsed >= 1) {
      setLifespanYears(parsed)
    } else {
      // Reset to current value if invalid
      setDraft(String(lifespanYears))
    }
    setIsEditing(false)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      commit()
    } else if (e.key === 'Escape') {
      setDraft(String(lifespanYears))
      setIsEditing(false)
    }
  }

  if (isEditing) {
    return (
      <span className="ml-auto inline-flex items-baseline">
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          value={draft}
          onChange={(e) => {
            // Only allow digits
            const val = e.target.value.replace(/[^0-9]/g, '')
            const parsed = parseInt(val, 10)
            if (!isNaN(parsed) && parsed > 100) {
              return
            }

            setDraft(val)
          }}
          onBlur={commit}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-b border-solid border-foreground outline-none p-0 m-0 text-inherit font-inherit leading-inherit text-right"
          style={{
            width: `${Math.max(1, draft.length)}ch`,
          }}
          aria-label="Expected lifespan in years"
        />
        <span className="ml-[0.25em]">years</span>
      </span>
    )
  }

  return (
    <span
      className="ml-auto cursor-pointer border-b-2 border-dashed border-muted-foreground/40 hover:border-foreground hover:text-foreground transition-colors"
      onClick={startEditing}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') startEditing()
      }}
      role="button"
      tabIndex={0}
      title="Click to change expected lifespan"
      aria-label={`Expected lifespan: ${lifespanYears} years. Click to edit.`}
    >
      {lifespanYears} years
    </span>
  )
}
