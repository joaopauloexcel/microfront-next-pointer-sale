import React from 'react'
import { CircularProgress } from '@mui/material'

import { LoadingProps } from './loading.types'
import { BoxLoading } from './loading.styles'

const Loading: React.FC<LoadingProps> = ({ isLoading }) => (
  <>
    {isLoading && (
      <BoxLoading data-testid="loading">
        <CircularProgress sx={{ margin: 'auto' }} color="inherit" />
      </BoxLoading>
    )}
  </>
)

export default Loading
