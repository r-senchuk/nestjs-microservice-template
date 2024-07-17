import { Injectable } from '@nestjs/common';
import { UsersResponseFactoryInterface } from './users-response-factory.interface';
import { UserResponseDataDto } from '../responses/user-response-data.dto';
import { SuccessResponse } from '../../../common/responses/success.response';
import { UserModel } from '../../../shared/users/models/user.model';

@Injectable()
export class UsersResponseFactoryService
  implements UsersResponseFactoryInterface
{
  createUserResponse(
    userData: UserModel,
  ): SuccessResponse<UserResponseDataDto> {
    return new SuccessResponse(this.prepareUser(userData));
  }

  createUsersResponse(
    userData: UserModel[],
  ): SuccessResponse<UserResponseDataDto[]> {
    return new SuccessResponse(userData.map((u) => this.prepareUser(u)));
  }

  private prepareUser(userData: UserModel): UserResponseDataDto {
    return new UserResponseDataDto(userData.id, userData.nickname);
  }
}
