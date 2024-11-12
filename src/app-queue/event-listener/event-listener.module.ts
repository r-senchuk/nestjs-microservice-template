import { Module } from '@nestjs/common';
import { ParamsModule } from '../../shared/params/params.module';
import { CreateUserController } from './controllers/create-user.controller';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { EmailsModule } from '../../shared/emails/emails.module';

@Module({
  controllers: [CreateUserController],
  providers: [CreateUserUseCase],
  imports: [ParamsModule, EmailsModule],
})
export class EventListenerModule {}
