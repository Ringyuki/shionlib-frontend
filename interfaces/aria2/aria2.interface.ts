export interface Aria2Settings {
  protocol: 'http' | 'https'
  host: string
  port: number
  path: string
  auth_secret: string
  downloadPath: string
}
