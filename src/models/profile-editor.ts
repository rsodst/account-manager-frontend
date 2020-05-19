export interface IProfileResponseErrorModel {
  status: number,
  message: string,
  errors:string
}

export interface IPersonDetails
{
  id : string,
  firstName : string,
  lastName : string,
  middleName : string
}