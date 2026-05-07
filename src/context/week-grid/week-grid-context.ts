import { createContext } from 'react'
import type { Phase, PhaseConfig } from './types'

export const PHASES: Record<Phase, PhaseConfig> = {
  childhood: {
    title: 'Childhood',
    chartColor: 'bg-chart-6',
    description: 'Wonder & Formation',
    chartColorFaded: 'bg-chart-6/20',
  },
  adolescence: {
    title: 'Adolescence',
    chartColor: 'bg-chart-7',
    description: 'Identity & Becoming',
    chartColorFaded: 'bg-chart-7/20',
  },
  adulthood: {
    title: 'Young adult',
    chartColor: 'bg-chart-8',
    description: 'Building & Striving',
    chartColorFaded: 'bg-chart-8/20',
  },
  prime: {
    title: 'Prime',
    chartColor: 'bg-chart-9',
    description: 'Peak Capacity',
    chartColorFaded: 'bg-chart-9/20',
  },
  maturity: {
    title: 'Maturity',
    chartColor: 'bg-chart-10',
    description: 'Wisdom & Reflection',
    chartColorFaded: 'bg-chart-10/20',
  },
  elder: {
    title: 'Elder',
    chartColor: 'bg-chart-11',
    description: 'Legacy & Peace',
    chartColorFaded: 'bg-chart-11/20',
  },
} as const

export const getPhase = (phase: Phase) => {
  return PHASES[phase]
}

export const WeekGridContext = createContext<{ phase?: Phase }>({})
