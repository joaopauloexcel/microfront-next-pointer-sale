import { useContext } from 'react'
import { SnackbarContext, SnackbarContextValue } from '@repo/ui/Snackbar'

const useSnackbar = () => {
  return useContext<SnackbarContextValue>(SnackbarContext)
}

export default useSnackbar
