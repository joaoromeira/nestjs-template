import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SignIn } from '@core/modules/auth/use-cases/sign-in';
import { AuthRepositoryDto } from '@core/modules/auth/domain/dtos/auth-repository.dto';
import { AuthTypeOrmRepository } from '@core/modules/auth/infrastructure/db/typeorm/auth-typeorm.repository';
import { AuthSchema } from '@core/modules/auth/infrastructure/db/typeorm/auth.schema';
import { AuthEntity } from '@core/modules/auth/domain/auth.entity';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserRepositoryDto } from '@core/modules/user/domain/dtos/user-repository.dto';
import { UserSchema } from '@core/modules/user/infrastructure/db/typeorm/user.schema';
import { UserTypeOrmRepository } from '@core/modules/user/infrastructure/db/typeorm/user-typeorm.repository';
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
      provide: AuthTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new AuthTypeOrmRepository(dataSource.getRepository(AuthEntity));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: UserTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new UserTypeOrmRepository(dataSource.getRepository(UserEntity));
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
      inject: [AuthTypeOrmRepository, UserTypeOrmRepository],
    },
    {
      provide: RefreshToken,
      useFactory: (authRepository: AuthRepositoryDto) => {
        return new RefreshToken(authRepository);
      },
      inject: [AuthTypeOrmRepository],
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
