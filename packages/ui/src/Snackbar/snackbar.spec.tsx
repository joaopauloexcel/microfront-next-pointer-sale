import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import SnackbarProvider from './Snackbar'

const makeSut = () => {
  return render(
    <SnackbarProvider>
      <div>SnackTest render children</div>
    </SnackbarProvider>
  )
}

describe('Snackbar component', () => {
  it('should render Snackbar Provider', () => {
    makeSut()

    const item = screen.getByText(/snacktest render children/i)
    expect(item).toBeInTheDocument()
  })
})
