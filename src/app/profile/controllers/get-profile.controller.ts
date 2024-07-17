import { Controller, Get, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ROUTES, TAGS } from '../../../constants';
import { ProfileResponseDataDto } from '../responses/profile-response-data.dto';
import { GetProfileUseCase } from '../use-cases/get-profile.use-case';
import { RequestDto } from '../../../common/requests/request.dto';
import { BusinessGuard } from '../../decorators/business-guard.decorator';
import { SuccessResponse } from '../../../common/responses/success.response';
import { ApiResponse } from '../../../common/decorators/responses/api-response.decorator';

@Controller()
export class GetProfileController {
  constructor(private useCase: GetProfileUseCase) {}

  @BusinessGuard()
  @ApiTags(TAGS.PROFILE)
  @ApiResponse(ProfileResponseDataDto)
  @Get(ROUTES.PROFILE_GET_PROFILE)
  execute(
    @Request() request: RequestDto,
  ): Promise<SuccessResponse<ProfileResponseDataDto>> {
    return this.useCase.execute(request.user);
  }
}
