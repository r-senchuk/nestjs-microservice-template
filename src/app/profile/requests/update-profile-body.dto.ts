import { ApiProperty } from '@nestjs/swagger';
import { IsUserNickname } from '../../../common/decorators/validations/is-user-nickname';

export class UpdateProfileBodyDto {
  @IsUserNickname()
  @ApiProperty({
    description: 'nickname of user',
    example: 'nickname',
    required: false,
  })
  readonly nickname: string;

  constructor(nickname: string) {
    this.nickname = nickname;
  }
}
