import { ListItemButtonProps } from '@mui/material'
import { ElementType } from 'react'

export interface MenuItem {
  label: string
  href: string
  icon: ElementType
}

export type MenuItemButtonProps = ListItemButtonProps & {
  component?: React.ElementType
  href?: string
  target?: string
  rel?: string
}
