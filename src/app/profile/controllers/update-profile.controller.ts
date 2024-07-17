import {
  Body,
  Controller,
  Put,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ROUTES, TAGS } from '../../../constants';
import { UpdateProfileBodyDto } from '../requests/update-profile-body.dto';
import { UpdateProfileUseCase } from '../use-cases/update-profile.use-case';
import { RequestDto } from '../../../common/requests/request.dto';
import { BusinessGuard } from '../../decorators/business-guard.decorator';
import { ProfileResponseDataDto } from '../responses/profile-response-data.dto';
import { ApiResponse } from '../../../common/decorators/responses/api-response.decorator';
import { SuccessResponse } from '../../../common/responses/success.response';

@Controller()
export class UpdateProfileController {
  constructor(private useCase: UpdateProfileUseCase) {}

  @BusinessGuard()
  @ApiTags(TAGS.PROFILE)
  @ApiResponse(ProfileResponseDataDto)
  @Put(ROUTES.PROFILE_UPDATE_PROFILE)
  @HttpCode(HttpStatus.OK)
  async execute(
    @Body() body: UpdateProfileBodyDto,
    @Request() request: RequestDto,
  ): Promise<SuccessResponse<ProfileResponseDataDto>> {
    return await this.useCase.execute(
      {
        ...body,
      },
      request.user,
    );
  }
}
