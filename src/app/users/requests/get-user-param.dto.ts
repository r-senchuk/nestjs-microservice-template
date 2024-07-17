import { ApiProperty } from '@nestjs/swagger';
import { IsUserId } from '../../../common/decorators/validations/is-user-id';

export class GetUserParamDto {
  @IsUserId()
  @ApiProperty({
    description: 'uuid of user',
    example: '8733e53a-b60e-4edf-b182-a7ce73f82746',
  })
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}
