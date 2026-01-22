import { List, ListItemIcon, ListItemText } from '@mui/material'

import { SidebarContainer, MenuItemButton } from './menu.styles'
import { menuItems } from './menu.config'
import { NextLinkAdapter } from '../common'

export function Menu() {
  return (
    <SidebarContainer>
      <List disablePadding>
        {menuItems.map((item) => {
          const Icon = item.icon
          const isExternal = item.href.startsWith('http')

          return (
            <MenuItemButton
              key={item.label}
              component={isExternal ? 'a' : NextLinkAdapter}
              href={item.href}
              target={isExternal ? '_self' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                <Icon fontSize="small" />
              </ListItemIcon>

              <ListItemText primary={item.label} />
            </MenuItemButton>
          )
        })}
      </List>
    </SidebarContainer>
  )
}
