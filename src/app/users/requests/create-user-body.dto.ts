import { ApiProperty } from '@nestjs/swagger';
import { IsUserNickname } from '../../../common/decorators/validations/is-user-nickname';
import { IsEmail } from 'class-validator';
import { IsUserPassword } from '../../../common/decorators/validations/is-user-password';

export class CreateUserBodyDto {
  @IsEmail()
  @ApiProperty({
    description: 'email of user',
    example: 'test@test.com',
  })
  readonly email: string;

  @IsUserNickname()
  @ApiProperty({
    description: 'nickname of user',
    example: 'John',
  })
  readonly nickname: string;

  @IsUserPassword()
  @ApiProperty({
    description: 'nickname of user',
    example: 'John',
  })
  readonly password: string;

  constructor(email: string, nickname: string, password: string) {
    this.email = email;
    this.nickname = nickname;
    this.password = password;
  }
}
