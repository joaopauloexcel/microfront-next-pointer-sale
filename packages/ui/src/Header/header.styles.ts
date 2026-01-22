import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const HeaderContainer = styled(Box)(({ theme }) => ({
  height: 64,
  width: '100%',
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.appBar,
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 3)
}))

export const HeaderLeft = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 12
}))

export const HeaderCenter = styled(Box)(() => ({
  flex: 1
}))

export const HeaderRight = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 16
}))
