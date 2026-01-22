import { styled } from '@mui/material/styles'
import { Box, ListItemButton } from '@mui/material'

import { MenuItemButtonProps } from './menu.types'
import { neutral } from '../theme/color'

export const MenuItemButton = styled(ListItemButton)<MenuItemButtonProps>(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
  '&:hover': {
    backgroundColor: neutral[500]
  }
}))

export const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 260,
  height: '100vh',
  backgroundColor: neutral[700],
  color: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  overflowY: 'auto'
}))
