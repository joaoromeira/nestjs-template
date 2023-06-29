import * as jwt from 'jsonwebtoken';

export const verifyToken = (token: string) => {
  return jwt.verify(token, String(process.env.JWT_SECRET));
};
