import { ApiProperty } from '@nestjs/swagger';

export class ProfileResponseDataDto {
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

  @ApiProperty({
    description: 'email of user',
    example: 'john_smith@metacape.com',
  })
  readonly email: string;

  constructor(id: string, nickname: string, email: string) {
    this.id = id;
    this.nickname = nickname;
    this.email = email;
  }
}
