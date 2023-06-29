import { AuthEntity, AuthProps } from '../auth.entity';

export interface AuthRepositoryDto {
  create(data: Omit<AuthProps, 'id'>): Promise<AuthEntity>;
  findOne(userId: number): Promise<AuthEntity>;
  remove(id: number): Promise<AuthEntity>;
  findByRefreshToken(refreshToken: string): Promise<AuthEntity>;
}
