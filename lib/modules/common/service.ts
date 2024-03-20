import { Request ,Response } from 'express';
import { response_status_codes } from './model';

export function successResponse(message: string, DATA: any, res: Response) {
    res.status(response_status_codes.success).json({
        status: true,
        message: message,
        data:DATA
    });
}

export function tokenResponse(message: string, DATA: any, res: Response) {
    res.header('auth_token', DATA.token).status(response_status_codes.success).json({
        status: true,
        message: message,
        data:DATA
    });
}

export function failureResponse(message: string, DATA: any, res: Response) {
     res.status(response_status_codes.success).json({
        status: false,
        message: message,
        data:DATA
    });
}

//
export function insufficientParameters(res: Response) {
    res.status(response_status_codes.bad_request).json({
        STATUS: 'FAILURE',
        MESSAGE: 'Insufficient parameters',
        DATA: {}
    });
}


export function mongoError(err: any, res: Response) {
    res.status(response_status_codes.success).json({
        status: false,
        message: 'mongo error',
        data: err
    });
}

//
export function forbidden (message: string,req:any, res: any) {
     res.status(response_status_codes.Forbidden).json({
        status: false,
        message: message,
        data: req
    });
}

//
export function validationError (message: string,req:Request, res: Response) {
    res.status(response_status_codes.bad_request).json({
       status: false,
       message: message,
       data: req
   });
}

//
export function notFound (req:Request, res: Response) {
    res.status(response_status_codes.not_found).json({
       status: false,
       message: "not found",
       data: req
   });
}

export function DatanotFound (message: string,req:Request, res: Response) {
    res.status(response_status_codes.not_found).json({
       status: false,
       message: message,
       data: req
   });
}

export function commenError (err: any,req:Request, res: Response) {
    res.status(response_status_codes.success).json({
       status: false,
       message: err,
       data: req
   });
}

