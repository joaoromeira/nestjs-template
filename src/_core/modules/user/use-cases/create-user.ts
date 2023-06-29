import { UserEntity } from '../domain/user.entity';
import { UserRepositoryDto } from '../domain/dtos/user-repository.dto';
import { hashPassword } from '@core/shared/application/encrypt/hash-password';

type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

type CreateUserOutput = {
  id: number;
  name: string;
  email: string;
};

export class CreateUser {
  constructor(private userRepository: UserRepositoryDto) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    // Hashed pass
    const password = hashPassword(input.password);

    const newUser = new UserEntity({ ...input, password });

    const user = await this.userRepository.create(newUser);

    return user.toJSON();
  }
}
