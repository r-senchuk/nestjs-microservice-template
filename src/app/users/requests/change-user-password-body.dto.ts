import { ApiProperty } from '@nestjs/swagger';
import { IsUserPassword } from '../../../common/decorators/validations/is-user-password';

export class ChangeUserPasswordBodyDto {
  @IsUserPassword()
  @ApiProperty({
    description: 'old user password',
    example: 'pass1',
  })
  readonly oldPassword: string;

  @IsUserPassword()
  @ApiProperty({
    description: 'new user password',
    example: 'pass2',
  })
  readonly newPassword: string;

  constructor(oldPassword: string, newPassword: string) {
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }
}
