export const colorOptions = ['primary', 'secondary', 'tertiarya', 'tertiaryb', 'neutral', 'success', 'error', 'info', 'warning'] as const
export type colorPropsOptions = (typeof colorOptions)[number]

type IColorNameValues = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

type IColorHexValue = `${'#'}${string}`

type IColorGeneric = {
  [colorName in colorPropsOptions]: {
    [colorNameValue in IColorNameValues]: IColorHexValue
  }
}
interface IColorNeutral {
  neutral: {
    white: string
    black: string
  }
}
export type IColor = IColorGeneric & IColorNeutral
export type IColorValue = IColor[colorPropsOptions][IColorNameValues]

export const primary: IColor['primary'] = {
  50: '#1090F9',
  100: '#0883E7',
  200: '#0972C8',
  300: '#0864B0',
  400: '#055A9E',
  500: '#054375',
  600: '#043862',
  700: '#032D4E',
  800: '#02223B',
  900: '#011727'
}

export const secondary: IColor['secondary'] = {
  50: '#F0FBFF',
  100: '#E1F7FF',
  200: '#BDEEFE',
  300: '#7CDDFD',
  400: '#40CDFC',
  500: '#05BDFB',
  600: '#03A7DD',
  700: '#0388B5',
  800: '#026A8D',
  900: '#024C64'
}

export const tertiarya: IColor['tertiarya'] = {
  50: '#EDF7DE',
  100: '#DAF0BC',
  200: '#C7E89B',
  300: '#B4E17A',
  400: '#A2D959',
  500: '#8CD133',
  600: '#7AB72A',
  700: '#649622',
  800: '#4D741A',
  900: '#375313'
}

export const tertiaryb: IColor['tertiaryb'] = {
  50: '#FEF8C3',
  100: '#FBF3A7',
  200: '#F9EC76',
  300: '#F7E06E',
  400: '#F4DA57',
  500: '#F3CB3F',
  600: '#F4B42A',
  700: '#F29E18',
  800: '#F29E18',
  900: '#752901'
}

export const neutral: IColor['neutral'] = {
  white: '#FFFFFF',
  50: '#F5F7F9',
  100: '#EFF2F6',
  200: '#D7DEE5',
  300: '#B9C5CF',
  400: '#9CAFBF',
  500: '#5A6872',
  600: '#4B5A68',
  700: '#212D36',
  800: '#111A22',
  900: '#091015',
  black: '#000000'
}

export const success: IColor['success'] = {
  50: '#D8FDE3',
  100: '#CCF8D9',
  200: '#9AEBB2',
  300: '#6FD98F',
  400: '#49C36E',
  500: '#26A94D',
  600: '#16903B',
  700: '#097329',
  800: '#015219',
  900: '#002C0D'
}

export const warning: IColor['warning'] = {
  50: '#FFF7DB',
  100: '#FFF5C2',
  200: '#FFE499',
  300: '#FFD666',
  400: '#FFC933',
  500: '#EEB412',
  600: '#D19200',
  700: '#9E6C00',
  800: '#705300',
  900: '#3D2A00'
}

export const info: IColor['info'] = {
  50: '#DBE5FF',
  100: '#C2D2FF',
  200: '#99B4FF',
  300: '#668FFF',
  400: '#356BFF',
  500: '#1954F5',
  600: '#0238CC',
  700: '#002999',
  800: '#001B66',
  900: '#000E33'
}

export const error: IColor['error'] = {
  50: '#FFDBDD',
  100: '#FFC7CA',
  200: '#FF9BA2',
  300: '#F6727E',
  400: '#E64F59',
  500: '#D0333D',
  600: '#B31C26',
  700: '#900C15',
  800: '#660209',
  900: '#330003'
}

const color: IColor = {
  primary,
  secondary,
  tertiarya,
  tertiaryb,
  neutral,
  success,
  warning,
  info,
  error
}

export default color
