import { info, success, tertiarya, warning } from '../theme/color'
import { SnackType } from './snackbar.types'

const colorFontError = '#621B16'
const colorBgError = '#FEECEB'
const colorIconError = '#DC6168'
export const colorFontSuccess = '#1E4620'

export const colorBgMap: Record<SnackType, string> = {
  success: tertiarya[50],
  error: colorBgError,
  info: info[100],
  warning: warning[100]
}

export const colorFontMap: Record<SnackType, string> = {
  success: colorFontSuccess,
  error: colorFontError,
  info: info[800],
  warning: warning[800]
}

export const colorIconMap: Record<SnackType, string> = {
  success: success[500],
  error: colorIconError,
  info: info[800],
  warning: warning[800]
}
