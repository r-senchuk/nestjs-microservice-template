import { ProfileResponseDataDto } from '../responses/profile-response-data.dto';
import { SuccessResponse } from '../../../common/responses/success.response';
import { UserModel } from '../../../shared/users/models/user.model';

export interface ProfileResponseFactoryInterface {
  getProfileResponse(
    userData: UserModel,
  ): SuccessResponse<ProfileResponseDataDto>;
}

export const ProfileResponseFactoryInterface = Symbol(
  'ProfileResponseFactoryInterface',
);
