'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TextField, Button, Typography, Link, CircularProgress } from '@mui/material'

import { LoginContainer, LoginCard, LogoBox } from './login.styles'

export default function LoginPage() {
  const emailMock = process.env.NEXT_PUBLIC_USER_NAME_MOCK!
  const passwordMock = process.env.NEXT_PUBLIC_USER_PASSWORD_MOCK!
  const [email, setEmail] = useState(emailMock)
  const [pass, setPass] = useState(passwordMock)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setErr('')
    setLoading(true)

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password: pass })
    })

    if (res.ok) {
      router.push('/')
    } else {
      const j = await res.json()
      setErr(j.error || 'Erro ao fazer login')
    }

    setLoading(false)
  }

  return (
    <LoginContainer>
      <LoginCard>
        <LogoBox>LOGO</LogoBox>
        <Typography variant="h5" fontWeight={600}>
          Acesso ao sistema
        </Typography>
        <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <TextField label="Usuário ou Email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />

          <TextField label="Senha" type="password" variant="outlined" fullWidth value={pass} onChange={(e) => setPass(e.target.value)} />

          {err && (
            <Typography color="error" fontSize={14}>
              {err}
            </Typography>
          )}

          <Button type="submit" variant="contained" size="large" fullWidth disabled={loading} sx={{ height: 48, borderRadius: 2 }}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'ENTRAR'}
          </Button>
        </form>
        <Link href="/" underline="hover" fontSize={14} sx={{ mt: 1 }}>
          Esqueceu sua senha?
        </Link>
      </LoginCard>
    </LoginContainer>
  )
}
