'use client'

import { IconButton, Typography, Avatar, Menu, MenuItem, Tooltip } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'

import { HeaderContainer, HeaderLeft, HeaderCenter, HeaderRight } from './header.styles'
import { pageTitles } from './header.config'

export function Header() {
  const router = useRouter()
  const pathname = usePathname()

  const title = pageTitles[pathname] ?? 'Página'

  const showBack = pathname.split('/').length > 2

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  async function handleLogout() {
    await fetch('/api/auth/logout', {
      method: 'POST'
    })

    window.location.href = '/login'
  }

  return (
    <HeaderContainer>
      <HeaderLeft>
        {showBack && (
          <Tooltip title="Voltar">
            <IconButton onClick={() => router.back()}>
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
        )}

        <Typography variant="h6" fontWeight={600}>
          {title}
        </Typography>
      </HeaderLeft>

      <HeaderCenter />

      <HeaderRight>
        <Tooltip title="Ajuda">
          <IconButton>
            <HelpOutlineIcon />
          </IconButton>
        </Tooltip>

        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <Avatar sx={{ width: 32, height: 32 }}>J</Avatar>
        </IconButton>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          <MenuItem>Perfil</MenuItem>
          <MenuItem onClick={handleLogout}>Sair</MenuItem>
        </Menu>
      </HeaderRight>
    </HeaderContainer>
  )
}
