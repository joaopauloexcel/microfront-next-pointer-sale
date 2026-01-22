import * as jwt from 'jsonwebtoken'

const ACCESS_TOKEN_EXP: string | undefined = process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXP
const REFRESH_TOKEN_EXP: string | undefined = process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXP

export function signAccessToken(payload: string | object | Buffer) {
  const options: jwt.SignOptions = { expiresIn: (ACCESS_TOKEN_EXP || '10m') as jwt.SignOptions['expiresIn'] }
  return jwt.sign(payload, process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET!, options)
}

export function signRefreshToken(payload: object) {
  const options: jwt.SignOptions = { expiresIn: (REFRESH_TOKEN_EXP || '30d') as jwt.SignOptions['expiresIn'] }
  return jwt.sign(payload, process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET!, options)
}

export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET!)
  } catch (e) {
    console.error(e)
    return null
  }
}

export function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(token, process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET!)
  } catch (e) {
    console.error(e)
    return null
  }
}
