export interface IUserAvatar {
    id : string
    filename : string
}

export interface IAvatarResponseErrorModel {
    status: number,
    message: string,
    errors:string
  }