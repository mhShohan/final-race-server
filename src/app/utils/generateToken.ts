import config from '../config';
import jwt from 'jsonwebtoken';
import { IJwtPayload } from '../interfaces/interface';

const generateToken = (payload: IJwtPayload) => {
  return jwt.sign(payload, config.JWT_ACCESS_SECRET!);
};

export default generateToken;
