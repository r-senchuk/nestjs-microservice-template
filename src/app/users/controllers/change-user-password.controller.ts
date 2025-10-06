import {Controller, Post, Body, Param} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ROUTES, TAGS } from '../../../constants';
import { ChangeUserPasswordUseCase } from '../use-cases/change-user-password.use-case';
import { ChangeUserPasswordBodyDto } from '../requests/change-user-password-body.dto';
import { SuccessResponse } from '../../../common/responses/success.response';
import { UserResponseDataDto } from '../responses/user-response-data.dto';
import { ChangeUserPasswordParamDto } from '../requests/change-user-password-param.dto';

@Controller()
export class ChangeUserPasswordController {
  constructor(private useCase: ChangeUserPasswordUseCase) {}

  @ApiTags(TAGS.USERS)
  @ApiOkResponse()
  @Post(ROUTES.USERS_CHANGE_USER_PASSWORD)
  execute(
      @Body() body: ChangeUserPasswordBodyDto,
      @Param() params: ChangeUserPasswordParamDto
  ): Promise<SuccessResponse<UserResponseDataDto>> {
    return this.useCase.execute({...body, ...params});
  }
}
