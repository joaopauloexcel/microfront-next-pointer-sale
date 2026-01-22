import { DialogSnackbar } from '@repo/ui/Snackbar'
import { useSnackbar } from '../useSnackbar'
import { AddDialogProps, UseDialogProps } from './useDialog.types'

const useDialog = (): UseDialogProps => {
  const { showSnackbar } = useSnackbar()

  const addDialog = (params: AddDialogProps) => {
    showSnackbar(<DialogSnackbar message={params.message} title={params.title} />, params.type)
  }

  return { addDialog }
}

export default useDialog
