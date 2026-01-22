import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import DialogSnackbar from './DialogSnackbar'
import { DialogSnackbarProps } from './dialogSnackbar.types'

const makeSut = (props?: Partial<DialogSnackbarProps>) => {
  const defaultProps: DialogSnackbarProps = {
    message: 'Algo de errado ocorreu',
    title: 'Ops'
  }

  return render(<DialogSnackbar {...defaultProps} {...props} />)
}

describe('DialogSnackbar component', () => {
  it('should render DialogSnackbar', () => {
    makeSut()

    const title = screen.getByText(/ops/i)
    expect(title).toBeInTheDocument()
  })

  it('should render DialogSnackbar', () => {
    makeSut()

    const message = screen.getByText(/Algo de errado ocorreu/i)
    expect(message).toBeInTheDocument()
  })
})
