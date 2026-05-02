import { CopyrightIcon } from 'lucide-react'

export function Footer() {
  return (
    <footer className="text-muted-foreground text-sm text-center p-2">
      <CopyrightIcon className="inline mr-2" />
      <span className="mr-auto">{new Date().getFullYear()}</span>
      <a
        href="https://harshitrv.in"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-2 hover:text-foreground transition-colors"
      >
        harshitrv
      </a>
    </footer>
  )
}
