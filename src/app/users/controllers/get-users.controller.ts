import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ROUTES, TAGS } from '../../../constants';
import { GetUsersUseCase } from '../use-cases/get-users.use-case';
import { UserResponseDataDto } from '../responses/user-response-data.dto';
import { ApiArrayResponse } from '../../../common/decorators/responses/api-array-response.decorator';
import { SuccessResponse } from '../../../common/responses/success.response';

@Controller()
export class GetUsersController {
  constructor(private useCase: GetUsersUseCase) {}

  @ApiTags(TAGS.USERS)
  @ApiArrayResponse(UserResponseDataDto)
  @Get(ROUTES.USERS_GET_USERS)
  @HttpCode(HttpStatus.OK)
  async execute(): Promise<SuccessResponse<UserResponseDataDto[]>> {
    return await this.useCase.execute();
  }
}
