import { UserProps } from '@core/modules/user/domain/user.entity';
import { AuthRepositoryDto } from '../domain/dtos/auth-repository.dto';
import { AuthEntity } from '../domain/auth.entity';
import { createToken } from '@core/shared/application/jwt/create-token';

type RefreshTokenInput = {
  refreshToken: string;
};

type RefreshTokenOutput = {
  accessToken: string;
  user: Omit<UserProps, 'password'>;
};

export class RefreshToken {
  constructor(private authRepository: AuthRepositoryDto) {}

  async execute({
    refreshToken,
  }: RefreshTokenInput): Promise<RefreshTokenOutput | null> {
    const currentAuth = await this.authRepository.findByRefreshToken(
      refreshToken,
    );

    await this.authRepository.remove(currentAuth.id);

    const authorization = createToken({
      userId: currentAuth.user.id,
    });

    const newAuth = new AuthEntity({
      ...authorization,
      user: currentAuth.user,
    });

    const auth = await this.authRepository.create(newAuth);

    return auth.toJSON();
  }
}
