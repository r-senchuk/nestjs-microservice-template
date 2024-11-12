import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { UserCreatedEvent } from '../../../common/dtos/user-created.event';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { USERS_CREATED_TOPIC } from '../../../common/constants';

export class CreateUserController {
  constructor(
    @Inject(CreateUserUseCase)
    private readonly useCase: CreateUserUseCase,
  ) {}

  @MessagePattern(USERS_CREATED_TOPIC)
  async execute(
    @Payload() request: UserCreatedEvent,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    await this.useCase.execute(request);
    const consumer = context.getConsumer();
    const { offset } = context.getMessage();
    const partition = context.getPartition();
    const topic = context.getTopic();
    await consumer.commitOffsets([{ topic, partition, offset }]);
  }
}
