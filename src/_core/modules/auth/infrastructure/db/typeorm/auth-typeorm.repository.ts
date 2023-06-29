import { AuthEntity } from '../../../domain/auth.entity';
import { AuthRepositoryDto } from '../../../domain/dtos/auth-repository.dto';
import { Repository } from 'typeorm';

export class AuthTypeOrmRepository implements AuthRepositoryDto {
  constructor(private ormRepo: Repository<AuthEntity>) {}

  async create(input: AuthEntity): Promise<AuthEntity> {
    const data = await this.ormRepo.save(input);

    return data;
  }

  findOne(userId: number): Promise<AuthEntity> {
    return this.ormRepo.findOneBy({
      user: {
        id: userId,
      },
    });
  }

  async remove(id: number): Promise<AuthEntity> {
    await this.ormRepo.delete(id);
    return this.ormRepo.findOneBy({ id });
  }

  findByRefreshToken(refreshToken: string): Promise<AuthEntity> {
    return this.ormRepo.findOne({
      where: { refreshToken },
      relations: { user: true },
    });
  }
}
