import { UserResponseDataDto } from '../responses/user-response-data.dto';
import { SuccessResponse } from '../../../common/responses/success.response';
import { UserModel } from '../../../shared/users/models/user.model';

export interface UsersResponseFactoryInterface {
  createUserResponse(userData: UserModel): SuccessResponse<UserResponseDataDto>;

  createUsersResponse(
    userData: UserModel[],
  ): SuccessResponse<UserResponseDataDto[]>;
}

export const UsersResponseFactoryInterface = Symbol(
  'UsersResponseFactoryInterface',
);
