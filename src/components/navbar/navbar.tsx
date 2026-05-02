import { Button } from '../ui/button'
import { SunIcon, MoonIcon, HomeIcon } from 'lucide-react'

import { useTheme } from '../theme-provider'
import { Link } from '@tanstack/react-router'

export function Navbar() {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="w-2/3 md:w-1/2 p-2">
      <ul className="flex items-center">
        <li className="mr-auto">
          <Button asChild size="icon" variant="ghost">
            <Link to="/">
              <HomeIcon />
            </Link>
          </Button>
        </li>
        <li>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? <SunIcon /> : <MoonIcon />}
          </Button>
        </li>
      </ul>
    </nav>
  )
}
