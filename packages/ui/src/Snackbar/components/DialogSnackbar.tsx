import { Box } from '@mui/material'

import { DialogSnackbarProps } from './dialogSnackbar.types'

const DialogSnackbar: React.FC<DialogSnackbarProps> = (props: DialogSnackbarProps) => (
  <Box display={'flex'} flexDirection={'column'} width={'auto'}>
    {props.title && (
      <Box fontWeight={500} fontSize={'16px'} lineHeight={'24px'}>
        {props.title}
      </Box>
    )}
    <Box fontWeight={400} fontSize={'14px'} lineHeight={'20px'} marginTop={'4px'}>
      {props.message}
    </Box>
  </Box>
)

export default DialogSnackbar
