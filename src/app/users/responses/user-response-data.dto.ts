import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDataDto {
  @ApiProperty({
    description: 'uuid of user',
    example: '8733e53a-b60e-4edf-b182-a7ce73f82746',
  })
  readonly id: string;

  @ApiProperty({
    description: 'nickname of user',
    example: 'nickname',
  })
  readonly nickname: string;

  constructor(id: string, nickname: string) {
    this.id = id;
    this.nickname = nickname;
  }
}
