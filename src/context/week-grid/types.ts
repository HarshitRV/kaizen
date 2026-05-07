export type Phase =
  | 'childhood'
  | 'adolescence'
  | 'adulthood'
  | 'prime'
  | 'maturity'
  | 'elder'

export interface PhaseConfig {
  title: string
  chartColor: string
  chartColorFaded: string
  description: string
}

export interface GridConfig {
  index: number
  week: number
  year: number
}

export interface GridBreakdown {
  childhoodGrid: GridConfig[]
  adolescenceGrid: GridConfig[]
  adulthoodGrid: GridConfig[]
  primeGrid: GridConfig[]
  maturityGrid: GridConfig[]
  elseGrid: GridConfig[]
}
