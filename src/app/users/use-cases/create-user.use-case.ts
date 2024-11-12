import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../../../shared/users/repositories/user-repository.interface';
import { CreateUserRequest } from '../requests/create-user.request';
import { ClientKafka } from '@nestjs/microservices';
import { UserCreatedEvent } from '../../../common/dtos/user-created.event';
import { USERS_CREATED_TOPIC } from '../../../common/constants';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists.exception';
import { UserFactoryInterface } from '../../../shared/users/factories/user-factory.interface';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(ClientKafka.name)
    private readonly kafkaClient: ClientKafka,

    @Inject(UserRepositoryInterface)
    private readonly userRepository: UserRepositoryInterface,

    @Inject(UserFactoryInterface)
    private readonly userFactory: UserFactoryInterface,
  ) {}

  async execute(request: CreateUserRequest): Promise<void> {
    const curUser = await this.userRepository.findOneByEmail(request.email);
    if (curUser) {
      throw new UserAlreadyExistsException(
        `User with email ${request.email} already exists`,
      );
    }

    const newUser = this.userFactory.createUser(
      request.password,
      request.nickname,
      request.email,
    );

    await this.userRepository.insert(newUser);

    await lastValueFrom(
      this.kafkaClient.emit<any, UserCreatedEvent>(USERS_CREATED_TOPIC, {
        nickname: newUser.nickname,
        email: newUser.email,
        id: newUser.id,
      }),
    );
  }
}
