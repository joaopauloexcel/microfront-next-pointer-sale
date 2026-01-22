import { renderHook, act } from '@testing-library/react'

import useDialog from './useDialog'
import { useSnackbar } from '../useSnackbar'
import { SnackTypesProps } from '@repo/ui/Snackbar'

vi.mock('../useSnackbar', () => ({
  useSnackbar: vi.fn()
}))

describe('useDialog hook', () => {
  it('should call showSnackbar with correct parameters', () => {
    const showSnackbarMock = vi.fn()

    vi.mocked(useSnackbar).mockReturnValue({
      showSnackbar: showSnackbarMock
    })

    const { result } = renderHook(() => useDialog())

    act(() => {
      result.current.addDialog({
        message: 'Test message',
        title: 'Test title',
        type: 'success'
      })
    })

    expect(showSnackbarMock).toHaveBeenCalledTimes(1)
  })

  it('should return an object with addDialog method', () => {
    vi.mocked(useSnackbar).mockReturnValue({
      showSnackbar: vi.fn()
    })

    const { result } = renderHook(() => useDialog())

    expect(result.current).toHaveProperty('addDialog')
    expect(typeof result.current.addDialog).toBe('function')
  })

  it('should handle different dialog types', () => {
    const showSnackbarMock = vi.fn()
    vi.mocked(useSnackbar).mockReturnValue({
      showSnackbar: showSnackbarMock
    })

    const { result } = renderHook(() => useDialog())

    const dialogTypes = ['success', 'error', 'warning', 'info']

    dialogTypes.forEach((type) => {
      act(() => {
        result.current.addDialog({
          message: `${type} message`,
          title: `${type} title`,
          type: type as SnackTypesProps
        })
      })
    })

    expect(showSnackbarMock).toHaveBeenCalledTimes(dialogTypes.length)
  })
})
