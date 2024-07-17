import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ROUTES, TAGS } from '../../../constants';
import { UserResponseDataDto } from '../responses/user-response-data.dto';
import { GetUserUseCase } from '../use-cases/get-user.use-case';
import { SuccessResponse } from '../../../common/responses/success.response';
import { ApiResponse } from '../../../common/decorators/responses/api-response.decorator';
import { GetUserParamDto } from '../requests/get-user-param.dto';

@Controller()
export class GetUserController {
  constructor(private useCase: GetUserUseCase) {}

  @ApiTags(TAGS.USERS)
  @ApiResponse(UserResponseDataDto)
  @Get(ROUTES.USERS_GET_USER)
  execute(
    @Param() params: GetUserParamDto,
  ): Promise<SuccessResponse<UserResponseDataDto>> {
    return this.useCase.execute({ id: params.id });
  }
}
