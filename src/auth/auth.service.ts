import { Injectable } from '@nestjs/common';
import { SignIn } from '@core/modules/auth/use-cases/sign-in';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshToken } from '@core/modules/auth/use-cases/refresh-token';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly signInUseCase: SignIn,
    private readonly refreshTokenUseCase: RefreshToken,
  ) {}

  signIn(signInDto: SignInDto) {
    return this.signInUseCase.execute(signInDto);
  }

  refreshTokenDto(refreshTokenDto: RefreshTokenDto) {
    return this.refreshTokenUseCase.execute(refreshTokenDto);
  }
}
