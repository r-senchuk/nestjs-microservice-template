import { Inject, Injectable } from '@nestjs/common';
import { UserResponseDataDto } from '../responses/user-response-data.dto';
import { UsersResponseFactoryInterface } from '../factories/users-response-factory.interface';
import { SuccessResponse } from '../../../common/responses/success.response';
import { UserRepositoryInterface } from '../../../shared/users/repositories/user-repository.interface';
import { GetUserRequest } from '../requests/get-user.request';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(UsersResponseFactoryInterface)
    private readonly usersResponseFactory: UsersResponseFactoryInterface,

    @Inject(UserRepositoryInterface)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(
    user: GetUserRequest,
  ): Promise<SuccessResponse<UserResponseDataDto>> {
    const curUser = await this.userRepository.getOneById(user.id);

    return this.usersResponseFactory.createUserResponse(curUser);
  }
}
