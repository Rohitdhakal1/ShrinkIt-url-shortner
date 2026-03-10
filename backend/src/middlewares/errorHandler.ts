import { Request, Response, NextFunction } from 'express';
import { APIError } from '../utils/apiError';

export const errorHandler = (
    err: Error | APIError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    let statusCode = 500;
    let message = 'Server Error';

    if (err instanceof APIError) {
        statusCode = err.statusCode;
        message = err.message;
    } else {
        // Log unexpected errors
        console.error('Unhandled Error:', err);
    }

    res.status(statusCode).json({
        success: false,
        message,
    });
};
