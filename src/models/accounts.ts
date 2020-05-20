export interface IAccount {
  id : string,
  number : string,
  balance : string,
  creationDate : string
}

export interface IGetAccounts {
  skip : number,
  take : number
}

export interface IGetAccountsHistory {
  skip : number,
  take : number
  id : string
}

export interface IAccountAction {
  type : string,
  creationDate : string
}

export interface ISetBalance {
  id : string
  amount : number
}

export interface IRefillAccountModel {
  id : string
  amount : number
}

export interface ITransferAccountModel {
  id : string
  amount : number,
  destinationAccountNumber : string,
  currency:number
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


export enum AccountActionType{
  Create,
  Close,
  Edit,
  Refil,
  Transfer
}

