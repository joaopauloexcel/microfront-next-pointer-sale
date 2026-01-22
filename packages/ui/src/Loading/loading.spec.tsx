import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { LoadingProps } from './loading.types'
import Loading from './Loading'

const makeSut = (props: LoadingProps) => render(<Loading {...props} />)

describe('Loading', () => {
  it('renders CircularProgress when isLoading is true', () => {
    makeSut({ isLoading: true })
    expect(screen.getByTestId('loading')).toBeDefined()
  })

  it('does not render CircularProgress when isLoading is false', () => {
    makeSut({ isLoading: false })
    expect(screen.queryByTestId('loading')).toBeNull()
  })
})
