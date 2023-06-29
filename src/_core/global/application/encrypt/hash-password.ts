import * as bcrypt from 'bcryptjs';

export const hashPassword = (value: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(value, salt);
};
