import * as dayjs from 'dayjs';
import * as jwt from 'jsonwebtoken';

export const createToken = (payload: any) => {
  const expiresIn = dayjs().add(1, 'hour').unix();

  const accessToken = jwt.sign(payload, String(process.env.JWT_SECRET), {
    expiresIn,
  });

  return { accessToken, refreshToken: accessToken, expiresIn };
};
