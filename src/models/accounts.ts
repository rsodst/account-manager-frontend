export interface IAccount {
  id : string,
  number : string,
  balance : string
}

export interface IGetAccounts {
  skip : number,
  take : number
}

export interface IAccountsResponseErrorModel {
  status: number,
  message: string,
  errors:string
}

export interface ICreateAccountModel {
  limitByOperation : number
  description : string
  currency : number
}