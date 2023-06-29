import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
/**
 * Modules
 */
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

/**
 * Schemas
 */
import { UserSchema } from '@core/modules/user/infrastructure/db/typeorm/user.schema';
import { AuthSchema } from '@core/modules/auth/infrastructure/db/typeorm/auth.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: String(process.env.POSTGRES_HOST),
      port: Number(process.env.POSTGRES_PORT),
      username: String(process.env.POSTGRES_USER),
      password: String(process.env.POSTGRES_PASSWORD),
      database: String(process.env.POSTGRES_DB),
      synchronize: true,
      logging: true,
      entities: [UserSchema, AuthSchema],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
