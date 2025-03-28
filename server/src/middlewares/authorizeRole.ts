import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

const authorizeRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(403, "You are not authorized to perform this action")
      );
    }
    next();
  };
};

export default authorizeRole;
