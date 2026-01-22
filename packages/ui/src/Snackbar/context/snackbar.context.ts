import { createContext } from 'react'

import { SnackbarContextValue } from '../snackbar.types'

const SnackbarContext = createContext({} as SnackbarContextValue)

export default SnackbarContext
