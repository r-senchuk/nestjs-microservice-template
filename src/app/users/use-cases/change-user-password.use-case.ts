import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../../../shared/users/repositories/user-repository.interface';
import {HashInterface} from "../services/hash.interface";
import {ChangeUserPasswordRequest} from "../requests/change-user-password.request";
import {SuccessResponse} from "../../../common/responses/success.response";
import {UserResponseDataDto} from "../responses/user-response-data.dto";
import {UsersResponseFactoryInterface} from "../factories/users-response-factory.interface";
import {UserIncorrectPasswordException} from "../exceptions/user-incorrect-password.exception";

@Injectable()
export class ChangeUserPasswordUseCase {
  constructor(
    @Inject(UserRepositoryInterface)
    private readonly userRepository: UserRepositoryInterface,

    @Inject(UsersResponseFactoryInterface)
    private readonly usersResponseFactory: UsersResponseFactoryInterface,

    @Inject(HashInterface)
    private readonly hashService: HashInterface,
  ) {}

  async execute(request: ChangeUserPasswordRequest): Promise<SuccessResponse<UserResponseDataDto>> {
    const user = await this.userRepository.getOneById(request.id);

    if (!(await this.hashService.compare(request.oldPassword, user.password))) {
      throw new UserIncorrectPasswordException(`Old password is not correct`);
    }
    user.password = await this.hashService.hash(request.newPassword);

    await this.userRepository.update(user);

    return this.usersResponseFactory.createUserResponse(user);
  }
}
