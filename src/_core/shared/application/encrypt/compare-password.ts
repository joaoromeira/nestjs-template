import * as bcrypt from 'bcryptjs';

export const comparePassword = (value: string, hashed: string) => {
  return bcrypt.compareSync(value, hashed);
};
