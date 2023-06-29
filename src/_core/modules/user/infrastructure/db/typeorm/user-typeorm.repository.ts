import { UserEntity, UserProps } from '../../../domain/user.entity';
import { UserRepositoryDto } from '../../../domain/dtos/user-repository.dto';
import { Repository } from 'typeorm';

export class UserTypeOrmRepository implements UserRepositoryDto {
  constructor(private ormRepo: Repository<UserEntity>) {}

  async create(input: UserEntity): Promise<UserEntity> {
    const result = await this.ormRepo.save(input);

    return result;
  }

  findAll(): Promise<UserEntity[]> {
    return this.ormRepo.find();
  }

  findOne(id: number): Promise<UserEntity> {
    return this.ormRepo.findOneBy({ id });
  }

  async update(id: number, input: Partial<UserProps>): Promise<UserEntity> {
    await this.ormRepo.update(id, input);

    return this.ormRepo.findOneBy({ id });
  }

  async remove(id: number): Promise<UserEntity> {
    await this.ormRepo.delete(id);
    return this.ormRepo.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.ormRepo
      .createQueryBuilder('user')
      .where({ email })
      .addSelect('user.password')
      .getOne();
  }
}
