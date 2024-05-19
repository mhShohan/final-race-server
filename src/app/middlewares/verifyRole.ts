import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import CustomError from '../errorHandler/customError';
import { TAdminRole } from '../interfaces/interface';

const verifyRole = (allowedRoles: TAdminRole[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const role: TAdminRole = req.user.role;

    if (allowedRoles.includes(role)) {
      next();
    } else {
      throw new CustomError(httpStatus.FORBIDDEN, 'Forbidden access!', 'FORBIDDEN');
    }
  };
};

export default verifyRole;
