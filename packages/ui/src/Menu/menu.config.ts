import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import InventoryIcon from '@mui/icons-material/Inventory2'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'

import { MenuItem } from './menu.types'

export const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: DashboardIcon
  },
  {
    label: 'Ponto de Venda',
    href: '/pvd',
    icon: ProductionQuantityLimitsIcon
  },
  {
    label: 'Produtos',
    href: '/produtos',
    icon: InventoryIcon
  },
  {
    label: 'Clientes',
    href: '/clientes',
    icon: PeopleIcon
  }
]
