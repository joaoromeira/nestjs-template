import { UserEntity } from '@core/modules/user/domain/user.entity';
import { UserRepositoryDto } from '../domain/dtos/user-repository.dto';

type FindOneUserOutput = {
  id: number;
  name: string;
  owner?: UserEntity;
};

export class FindOneUser {
  constructor(private userRepository: UserRepositoryDto) {}

  async execute(id: number): Promise<FindOneUserOutput> {
    const user = await this.userRepository.findOne(id);

    return user.toJSON();
  }
}
