export interface IResponseErrorModel {
  status: number,
  message: string,
  errors:string
}

export interface ISignInModel {
  email: string,
  password: string
}

export interface ISignUpModel {
  email: string,
  password: string
}

export interface IUserCredential {
  email: string
  userId: string
  accessToken: string
  issuedDate: string
  isAuthenticated:boolean
}