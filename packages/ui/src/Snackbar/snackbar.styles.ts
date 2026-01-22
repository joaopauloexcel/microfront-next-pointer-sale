import { Alert, styled } from '@mui/material'

import { colorBgMap, colorFontMap, colorFontSuccess, colorIconMap } from './snackbar.definitions'
import { SnackType } from './snackbar.types'
import { success, tertiarya } from '../theme/color'

export const CustomAlertDialog = styled(Alert)<{ colorprops: SnackType | undefined }>`
  background-color: ${(props) => colorBgMap[props.colorprops as SnackType] ?? tertiarya[50]};
  color: ${(props) => colorFontMap[props.colorprops as SnackType] ?? colorFontSuccess};
  width: 300px;
  position: fixed;
  right: 24px;
  top: 114px;
  box-shadow: 0em 0.1em 0.4em rgb(0 0 0 / 40%);
  & .MuiAlert-icon {
    color: ${(props) => colorIconMap[props.colorprops as SnackType] ?? success[500]};
    position: relative;
    top: 1.8px;
  }
`
