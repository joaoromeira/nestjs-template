import { UserProps } from '@core/modules/user/domain/user.entity';
import { AuthRepositoryDto } from '../domain/dtos/auth-repository.dto';
import { UserRepositoryDto } from '@core/modules/user/domain/dtos/user-repository.dto';
import { AuthEntity } from '../domain/auth.entity';
import { comparePassword } from '@core/shared/application/encrypt/compare-password';
import { createToken } from '@core/shared/application/jwt/create-token';
import { logger } from '@core/shared/vendor/logger';

type SignInInput = {
  email: string;
  password: string;
};

type SignInOutput = {
  accessToken: string;
  user: Omit<UserProps, 'password'>;
};

export class SignIn {
  constructor(
    private authRepository: AuthRepositoryDto,
    private userRepository: UserRepositoryDto,
  ) {}

  async execute({
    email,
    password,
  }: SignInInput): Promise<SignInOutput | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!comparePassword(password, user.password)) {
      // Throw error
      return null;
    }
    logger.info({ user });

    const currentAuth = await this.authRepository.findOne(user.id);

    logger.info({ currentAuth });
    // Check if it has token and if it isn't expired
    if (currentAuth) {
      await this.authRepository.remove(currentAuth.id);
    }

    const authorization = createToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    const newAuth = new AuthEntity({
      ...authorization,
      user,
    });

    const auth = await this.authRepository.create(newAuth);

    logger.info(auth);
    return auth.toJSON();
  }
}
