import { UserEntity, UserProps } from '../user.entity';

export interface UserRepositoryDto {
  create(data: Omit<UserProps, 'id'>): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  findOne(id: number): Promise<UserEntity>;
  update(id: number, data: Partial<Omit<UserProps, 'id'>>): Promise<UserEntity>;
  remove(id: number): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
}
