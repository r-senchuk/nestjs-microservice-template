import { Inject, Injectable } from '@nestjs/common';
import { UserResponseDataDto } from '../responses/user-response-data.dto';
import { UsersResponseFactoryInterface } from '../factories/users-response-factory.interface';
import { SuccessResponse } from '../../../common/responses/success.response';
import { UserRepositoryInterface } from '../../../shared/users/repositories/user-repository.interface';

@Injectable()
export class GetUsersUseCase {
  constructor(
    @Inject(UsersResponseFactoryInterface)
    private readonly usersResponseFactory: UsersResponseFactoryInterface,

    @Inject(UserRepositoryInterface)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(): Promise<SuccessResponse<UserResponseDataDto[]>> {
    const users = await this.userRepository.findAll();

    return this.usersResponseFactory.createUsersResponse(users);
  }
}
