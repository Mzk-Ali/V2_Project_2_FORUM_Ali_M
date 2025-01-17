import { Response } from 'express';

interface IApiResponse {
    status: 'success' | 'error';
    message: string;
    data?: any;
    error?: any;
}

const sendResponse = (res: Response, statusCode: number, responseBody: IApiResponse) => {
    res.status(statusCode).json(responseBody);
};

export const successResponse = (res: Response, statusCode: number = 200, message: string, data?: any) => {
    sendResponse(res, statusCode, {
        status: 'success',
        message,
        data,
        error: null
    });
};

export const errorResponse = (res: Response, message: string, error?: any, statusCode: number = 500) => {
    sendResponse(res, statusCode, {
        status: 'error',
        message,
        data: null,
        error
    });
};
