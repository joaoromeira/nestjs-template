import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CreateUser } from '@core/modules/user/use-cases/create-user';
import { UserRepositoryDto } from '@core/modules/user/domain/dtos/user-repository.dto';
import { FindAllUsers } from '@core/modules/user/use-cases/find-all-users';
import { UserTypeOrmRepository } from '@core/modules/user/infrastructure/db/typeorm/user-typeorm.repository';
import { UserSchema } from '@core/modules/user/infrastructure/db/typeorm/user.schema';
import { UserEntity } from '@core/modules/user/domain/user.entity';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { FindOneUser } from '@core/modules/user/use-cases/find-one-user';
import { UpdateUser } from '@core/modules/user/use-cases/update-user';
import { RemoveUser } from '@core/modules/user/use-cases/remove-user';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: UserTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new UserTypeOrmRepository(dataSource.getRepository(UserEntity));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: CreateUser,
      useFactory: (userRepository: UserRepositoryDto) => {
        return new CreateUser(userRepository);
      },
      inject: [UserTypeOrmRepository],
    },
    {
      provide: FindAllUsers,
      useFactory: (userRepository: UserRepositoryDto) => {
        return new FindAllUsers(userRepository);
      },
      inject: [UserTypeOrmRepository],
    },
    {
      provide: FindOneUser,
      useFactory: (userRepository: UserRepositoryDto) => {
        return new FindOneUser(userRepository);
      },
      inject: [UserTypeOrmRepository],
    },
    {
      provide: UpdateUser,
      useFactory: (userRepository: UserRepositoryDto) => {
        return new UpdateUser(userRepository);
      },
      inject: [UserTypeOrmRepository],
    },
    {
      provide: RemoveUser,
      useFactory: (userRepository: UserRepositoryDto) => {
        return new RemoveUser(userRepository);
      },
      inject: [UserTypeOrmRepository],
    },
  ],
})
export class UserModule {}
