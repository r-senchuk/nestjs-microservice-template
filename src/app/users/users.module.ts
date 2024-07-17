import { Module } from '@nestjs/common';
import { GetUserController } from './controllers/get-user.controller';
import { GetUserUseCase } from './use-cases/get-user.use-case';
import { GetUsersController } from './controllers/get-users.controller';
import { GetUsersUseCase } from './use-cases/get-users.use-case';
import { UsersResponseFactoryService } from './factories/users-response-factory.service';
import { UsersResponseFactoryInterface } from './factories/users-response-factory.interface';
import { UsersModule as SharedUsersModule } from '../../shared/users/users.module';

@Module({
  controllers: [GetUserController, GetUsersController],
  providers: [
    GetUserUseCase,
    GetUsersUseCase,
    {
      provide: UsersResponseFactoryInterface,
      useClass: UsersResponseFactoryService,
    },
  ],
  imports: [SharedUsersModule],
})
export class UsersModule {}
