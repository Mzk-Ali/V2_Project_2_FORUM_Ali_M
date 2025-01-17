import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

// Middleware pour gérer les erreurs de validation
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): any => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
};