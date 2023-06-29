import { Injectable } from '@nestjs/common';
import { CreateUser } from '@core/modules/user/use-cases/create-user';
import { FindAllUsers } from '@core/modules/user/use-cases/find-all-users';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOneUser } from '@core/modules/user/use-cases/find-one-user';
import { RemoveUser } from '@core/modules/user/use-cases/remove-user';
import { UpdateUser } from '@core/modules/user/use-cases/update-user';

@Injectable()
export class UserService {
  constructor(
    private readonly createUser: CreateUser,
    private readonly findAllUsers: FindAllUsers,
    private readonly findOneUser: FindOneUser,
    private readonly updateUser: UpdateUser,
    private readonly removeUser: RemoveUser,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.createUser.execute(createUserDto);
  }

  findAll() {
    return this.findAllUsers.execute();
  }

  findOne(id: number) {
    return this.findOneUser.execute(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.updateUser.execute(id, updateUserDto);
  }

  remove(id: number) {
    return this.removeUser.execute(id);
  }
}
