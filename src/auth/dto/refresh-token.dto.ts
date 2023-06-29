import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    default: 'token',
    description: 'Refresh token',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  refreshToken: string;
}
