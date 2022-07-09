import { Image } from './image.type'

export interface User {
  id?: string
  token?: string | null
  display_name?: string
  images?: Image[]
  type?: string
  authStateCode?: string | null
  error?: string | null
}

export interface AuthUserDetails {
  access_token: string
  state?: string
  token_type: string
  expires_in: string
}
