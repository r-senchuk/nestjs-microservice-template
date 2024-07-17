import { Module } from '@nestjs/common';
import { GetProfileController } from './controllers/get-profile.controller';
import { GetProfileUseCase } from './use-cases/get-profile.use-case';
import { UpdateProfileController } from './controllers/update-profile.controller';
import { UpdateProfileUseCase } from './use-cases/update-profile.use-case';
import { ProfileResponseFactory } from './factories/profile-response-factory.service';
import { ProfileResponseFactoryInterface } from './factories/profile-response-factory.interface';
import { UsersModule } from '../../shared/users/users.module';

@Module({
  controllers: [GetProfileController, UpdateProfileController],
  providers: [
    GetProfileUseCase,
    UpdateProfileUseCase,
    {
      provide: ProfileResponseFactoryInterface,
      useClass: ProfileResponseFactory,
    },
  ],
  imports: [UsersModule],
})
export class ProfileModule {}
