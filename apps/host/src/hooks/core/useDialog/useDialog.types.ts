import { SnackTypesProps } from '@repo/ui/Snackbar'

export type AddDialogProps = {
  message: string
  type?: SnackTypesProps
  title?: string
}

export type UseDialogProps = { addDialog: (params: AddDialogProps) => void }
