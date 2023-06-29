import { EntitySchema } from 'typeorm';
import { UserEntity } from '../../../domain/user.entity';

export const UserSchema = new EntitySchema<UserEntity>({
  name: 'user',
  target: UserEntity,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: 'increment',
    },
    name: {
      type: String,
      nullable: false,
    },
    email: {
      type: String,
      nullable: false,
      unique: true,
    },
    password: {
      type: String,
      nullable: false,
      select: false,
    },
  },
});
