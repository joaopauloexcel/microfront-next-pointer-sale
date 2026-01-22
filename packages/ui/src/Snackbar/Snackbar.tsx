import React, { useState, useCallback } from 'react'
import Snackbar from '@mui/material/Snackbar'

import { SnackbarContext } from './context'
import { SnackbarProviderProps, ShowSnackbarFn, SnackState } from './snackbar.types'
import { CustomAlertDialog } from './snackbar.styles'

const SnackbarProvider = (props: React.PropsWithChildren<SnackbarProviderProps>) => {
  const [snackbar, setSnackbar] = useState<SnackState>({
    open: false,
    content: null
  })

  const showSnackbar: ShowSnackbarFn = useCallback((content = null, color = 'success') => {
    setSnackbar({ open: true, content, color })
  }, [])

  const closeSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }))
  }, [])

  return (
    <SnackbarContext.Provider value={{ showSnackbar, closeSnackbar }}>
      {props.children}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={closeSnackbar}>
        <CustomAlertDialog colorprops={snackbar.color} onClose={closeSnackbar} variant="standard" severity={snackbar.color}>
          {snackbar.content}
        </CustomAlertDialog>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}

export default SnackbarProvider
