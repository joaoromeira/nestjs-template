import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    default: 'Foo Lano',
    description: 'Full name of user',
    required: true,
  })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  name: string;

  @ApiProperty({
    default: 'foo@lano.com',
    description: 'Email of user',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty({
    default: '#Pass123',
    description: 'Password of user',
    required: true,
  })
  @IsNotEmpty()
  @IsStrongPassword()
  @MaxLength(255)
  password: string;
}
