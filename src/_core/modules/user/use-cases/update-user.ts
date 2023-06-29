import { UserRepositoryDto } from '../domain/dtos/user-repository.dto';

type UpdateUserInput = {
  name: string;
  email: string;
};

type UpdateUserOutput = {
  id: number;
  name: string;
  email: string;
};

export class UpdateUser {
  constructor(private userRepository: UserRepositoryDto) {}

  async execute(
    id: number,
    data: Partial<UpdateUserInput>,
  ): Promise<UpdateUserOutput> {
    const user = await this.userRepository.update(id, data);

    return user.toJSON();
  }
}
