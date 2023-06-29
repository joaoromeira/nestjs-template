import { UserRepositoryDto } from '../domain/dtos/user-repository.dto';

type RemoveUserOutput = {
  id: number;
};

export class RemoveUser {
  constructor(private userRepository: UserRepositoryDto) {}

  async execute(id: number): Promise<RemoveUserOutput> {
    const user = await this.userRepository.remove(id);

    return user.toJSON();
  }
}
