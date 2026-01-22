export interface Auth {
  accessToken: string
  idToken: string
  email: string
  name: string
  permissions?: string[] | null
  userCode?: number | null
}
