export interface AuthResponseDTO {
  Id: number
  Name: string
  Email: string
  Token: string
}

export interface LoginDTO {
  Email: string
  Password: string
}