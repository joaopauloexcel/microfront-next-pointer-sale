import React from 'react'
import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import useSnackbar from './useSnackbar'
import { SnackbarProvider } from '@repo/ui/Snackbar'

const makeSut = () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => <SnackbarProvider>{children}</SnackbarProvider>
  return renderHook(() => useSnackbar(), { wrapper })
}

describe('GIVEN useSnackbar', () => {
  describe('WHEN rendered', () => {
    it('THEN valid showSnackbar function', () => {
      const { result } = makeSut()
      const { showSnackbar } = result.current
      expect(typeof showSnackbar).toEqual('function')
    })

    it('THEN valid closeSnackbar function', () => {
      const { result } = makeSut()
      const { closeSnackbar } = result.current
      expect(typeof closeSnackbar).toEqual('function')
    })
  })
})
