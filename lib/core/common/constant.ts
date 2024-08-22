export const APPLICATION_JSON = 'application/json';

export enum ResponseStatusCodes {
    success = 200,
    bad_request = 400,
    not_found=404,
    Unauthorized =401,
    Forbidden =403,
    internal_server_error = 500,

}


export interface IData {
    err: boolean;
    message?: string;
    data?: any;
  }

  
export const CONTENT_TYPE_ERROR= "Content type must be application/json"