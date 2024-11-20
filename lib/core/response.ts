import { Request, Response } from "express";
import { ResponseStatusCodes } from "./common/constant";

export interface IPage {
  records: any;
  total: number
}

export function successResponse(data: any, message: string,res: Response) {
  res.status(ResponseStatusCodes.success).json({
    code: ResponseStatusCodes.success,
    status: true,
    message,
    data,
  });
}

export function failureResponse(message: string, res: Response) {
  res.status(ResponseStatusCodes.success).json({
    code: ResponseStatusCodes.success,
    status: false,
    message,
    data: {},
  });
}

export function badResponse(data: any, res: Response) {
  const errorMessage = data && data.length > 0 ? data[0].msg : "";
  res.status(ResponseStatusCodes.bad_request).json({
    code: ResponseStatusCodes.bad_request,
    status: false,
    message: errorMessage,
    data,
  });
}

export function tokenResponse(message: string, DATA: any, res: Response) {
  res
    .header("auth_token", DATA.token)
    .status(ResponseStatusCodes.success)
    .json({
      status: true,
      message: message,
      data: DATA,
    });
}

export function forbidden(message: string, req: any, res: any) {
  res.status(ResponseStatusCodes.Forbidden).json({
    status: false,
    message: message,
    data: req,
  });
}

//
export function validationError(message: string, req: Request, res: Response) {
  res.status(ResponseStatusCodes.bad_request).json({
    status: false,
    message: message,
    data: req,
  });
}

//
export function notFound(req: Request, res: Response) {
  res.status(ResponseStatusCodes.not_found).json({
    status: false,
    message: "not found",
    data: req,
  });
}

export function commonError(err: any, req: Request, res: Response) {
  res.status(ResponseStatusCodes.success).json({
    status: false,
    message: err,
    data: req,
  });
}
