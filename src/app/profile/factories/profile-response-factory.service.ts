import { Injectable } from '@nestjs/common';
import { ProfileResponseFactoryInterface } from './profile-response-factory.interface';
import { ProfileResponseDataDto } from '../responses/profile-response-data.dto';
import { SuccessResponse } from '../../../common/responses/success.response';
import { UserModel } from '../../../shared/users/models/user.model';

@Injectable()
export class ProfileResponseFactory implements ProfileResponseFactoryInterface {
  getProfileResponse(
    userData: UserModel,
  ): SuccessResponse<ProfileResponseDataDto> {
    return new SuccessResponse(
      new ProfileResponseDataDto(
        userData.id,
        userData.nickname,
        userData.email,
      ),
    );
  }
}
