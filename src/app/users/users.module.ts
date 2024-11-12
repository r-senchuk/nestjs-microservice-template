import { Module } from '@nestjs/common';
import { GetUserController } from './controllers/get-user.controller';
import { GetUserUseCase } from './use-cases/get-user.use-case';
import { GetUsersController } from './controllers/get-users.controller';
import { GetUsersUseCase } from './use-cases/get-users.use-case';
import { UsersResponseFactoryService } from './factories/users-response-factory.service';
import { UsersResponseFactoryInterface } from './factories/users-response-factory.interface';
import { UsersModule as SharedUsersModule } from '../../shared/users/users.module';
import { ParamsModule } from '../../shared/params/params.module';
import { APP_ID } from '../../constants';
import PARAMETERS from '../../shared/params/params.constants';
import { CreateUserController } from './controllers/create-user.controller';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [GetUserController, GetUsersController, CreateUserController],
  providers: [
    GetUserUseCase,
    GetUsersUseCase,
    CreateUserUseCase,
    {
      provide: UsersResponseFactoryInterface,
      useClass: UsersResponseFactoryService,
    },
  ],
  imports: [
    SharedUsersModule,
    ClientsModule.registerAsync([
      {
        name: ClientKafka.name,
        imports: [ParamsModule],
        useFactory: (KAFKA_BROKER: string) => {
          return {
            transport: Transport.KAFKA,
            options: {
              producerOnlyMode: true,
              client: {
                clientId: APP_ID,
                brokers: [KAFKA_BROKER],
              },
            },
          };
        },
        inject: [PARAMETERS.KAFKA_PRODUCER],
      },
    ]),
  ],
})
export class UsersModule {}
