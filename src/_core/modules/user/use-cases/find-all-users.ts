import { UserRepositoryDto } from '../domain/dtos/user-repository.dto';

type FindAllUsersOutput = {
  id: number;
  name: string;
};

export class FindAllUsers {
  constructor(private userRepository: UserRepositoryDto) {}

  async execute(): Promise<FindAllUsersOutput[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => user.toJSON());
  }
}
