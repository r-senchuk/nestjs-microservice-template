import { Inject, Injectable } from '@nestjs/common';
import { ProfileResponseDataDto } from '../responses/profile-response-data.dto';
import { ProfileResponseFactoryInterface } from '../factories/profile-response-factory.interface';
import { JwtPayloadDataDto } from '../../../common/dtos/jwt-payload.dto';
import { SuccessResponse } from '../../../common/responses/success.response';
import { UserRepositoryInterface } from '../../../shared/users/repositories/user-repository.interface';

@Injectable()
export class GetProfileUseCase {
  constructor(
    @Inject(ProfileResponseFactoryInterface)
    private readonly profileResponseFactory: ProfileResponseFactoryInterface,

    @Inject(UserRepositoryInterface)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(
    user: JwtPayloadDataDto,
  ): Promise<SuccessResponse<ProfileResponseDataDto>> {
    const curUser = await this.userRepository.getOneById(user.id);

    return this.profileResponseFactory.getProfileResponse(curUser);
  }
}
