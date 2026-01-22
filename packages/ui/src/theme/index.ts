'use client'
import { createTheme } from '@mui/material/styles'

import color, { IColor } from './color'
import { baseFontFamily } from '../common'

declare module '@mui/material/styles' {
  interface Theme {
    color: IColor
  }
  interface ThemeOptions {
    color: IColor
  }
  interface Palette {
    tertiarya: Palette['primary']
    tertiaryb: Palette['primary']
    neutral: Palette['primary']
  }
  interface PaletteOptions {
    tertiarya: PaletteOptions['primary']
    tertiaryb: PaletteOptions['primary']
    neutral: PaletteOptions['primary']
  }
  interface PaletteColor {
    lighter: string
    darker?: string
  }
  interface SimplePaletteColorOptions {
    lighter: string
    darker?: string
  }
}

export const theme = createTheme({
  color,
  palette: {
    background: {
      default: color.neutral[50]
    },
    primary: {
      lighter: color.primary[100],
      light: color.primary[300],
      main: color.primary[500],
      dark: color.primary[700],
      darker: color.primary[900]
    },
    secondary: {
      lighter: color.secondary[100],
      light: color.secondary[300],
      main: color.secondary[500],
      dark: color.secondary[700],
      darker: color.secondary[900]
    },
    tertiarya: {
      lighter: color.tertiarya[100],
      light: color.tertiarya[300],
      main: color.tertiarya[500],
      dark: color.tertiarya[700],
      darker: color.tertiarya[900]
    },
    tertiaryb: {
      lighter: color.tertiaryb[100],
      light: color.tertiaryb[300],
      main: color.tertiaryb[500],
      dark: color.tertiaryb[700],
      darker: color.tertiaryb[900]
    },
    neutral: {
      lighter: color.neutral[100],
      light: color.neutral[300],
      main: color.neutral[500],
      dark: color.neutral[700],
      darker: color.neutral[900]
    },
    error: {
      lighter: color.error[100],
      light: color.error[300],
      main: color.error[500],
      dark: color.error[700],
      darker: color.error[900]
    },
    info: {
      lighter: color.info[100],
      light: color.info[300],
      main: color.info[500],
      dark: color.info[700],
      darker: color.info[900]
    },
    success: {
      lighter: color.success[100],
      light: color.success[300],
      main: color.success[500],
      dark: color.success[700],
      darker: color.success[900]
    },
    warning: {
      lighter: color.warning[100],
      light: color.warning[300],
      main: color.warning[500],
      dark: color.warning[700],
      darker: color.warning[900]
    }
  },
  typography: {
    fontFamily: baseFontFamily
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  }
})
