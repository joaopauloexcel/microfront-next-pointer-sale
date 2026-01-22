import { SnackbarCloseReason } from '@mui/material'
import { ReactNode, SyntheticEvent } from 'react'

export type SnackType = 'error' | 'info' | 'success' | 'warning'

export interface SnackState {
  open: boolean
  content?: ReactNode | null
  color?: SnackType
}

export type ShowSnackbarFn = (content?: ReactNode | null, color?: SnackType) => void

export type CloseSnackbarFn = (event: SyntheticEvent | Event, reason: SnackbarCloseReason) => void

export interface SnackbarContextValue {
  showSnackbar: ShowSnackbarFn
  closeSnackbar?: CloseSnackbarFn
}

export interface SnackbarProviderProps {
  children: ReactNode
}
export type SnackTypesProps = 'error' | 'info' | 'success' | 'warning'
