import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class SignInDto {
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
