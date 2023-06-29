import { AuthEntity } from '@core/modules/auth/domain/auth.entity';
import { EntitySchema } from 'typeorm';

export const AuthSchema = new EntitySchema<AuthEntity>({
  name: 'auth',
  target: AuthEntity,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: 'increment',
    },
    accessToken: {
      type: String,
      nullable: false,
    },
    refreshToken: {
      type: String,
      nullable: false,
    },
    expiresIn: {
      type: Number,
      nullable: false,
    },
  },
  relations: {
    user: {
      type: 'one-to-one',
      target: 'UserEntity',
      joinColumn: {
        referencedColumnName: 'id',
      },
    },
  },
});
