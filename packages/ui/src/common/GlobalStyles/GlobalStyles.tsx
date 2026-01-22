import MuiGlobalStyles from '@mui/material/GlobalStyles'

export const baseFontFamily = ['Red Hat Display', 'sans-serif'].join(',')

export const GlobalStyles: React.FC = () => {
  return (
    <MuiGlobalStyles
      styles={{
        '*': {
          fontFamily: baseFontFamily
        }
      }}
    />
  )
}
