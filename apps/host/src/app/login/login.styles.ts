import { styled } from '@mui/material/styles'
import { Box, Card } from '@mui/material'

export const LoginContainer = styled(Box)(() => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
}))

export const LoginCard = styled(Card)(({ theme }) => ({
  width: 380,
  padding: theme.spacing(4),
  borderRadius: 16,
  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(3)
}))

export const LogoBox = styled(Box)(() => ({
  fontSize: 28,
  fontWeight: 700,
  letterSpacing: 1
}))
