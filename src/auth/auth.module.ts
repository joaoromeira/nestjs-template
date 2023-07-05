import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SignIn } from '@core/modules/auth/use-cases/sign-in';
import { AuthRepositoryDto } from '@core/modules/auth/domain/dtos/auth-repository.dto';
import { AuthOrmRepository } from '@core/modules/auth/infrastructure/db/typeorm/auth-typeorm.repository';
import { AuthSchema } from '@core/modules/auth/infrastructure/db/typeorm/auth.schema';
import { AuthEntity } from '@core/modules/auth/domain/auth.entity';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserRepositoryDto } from '@core/modules/user/domain/dtos/user-repository.dto';
import { UserSchema } from '@core/modules/user/infrastructure/db/typeorm/user.schema';
import { UserOrmRepository } from '@core/modules/user/infrastructure/db/typeorm/user-typeorm.repository';
import { UserEntity } from '@core/modules/user/domain/user.entity';
import { RefreshToken } from '@core/modules/auth/use-cases/refresh-token';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([AuthSchema, UserSchema])],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: AuthOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new AuthOrmRepository(dataSource.getRepository(AuthEntity));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: UserOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new UserOrmRepository(dataSource.getRepository(UserEntity));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: SignIn,
      useFactory: (
        authRepository: AuthRepositoryDto,
        userRepository: UserRepositoryDto,
      ) => {
        return new SignIn(authRepository, userRepository);
      },
      inject: [AuthOrmRepository, UserOrmRepository],
    },
    {
      provide: RefreshToken,
      useFactory: (authRepository: AuthRepositoryDto) => {
        return new RefreshToken(authRepository);
      },
      inject: [AuthOrmRepository],
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
