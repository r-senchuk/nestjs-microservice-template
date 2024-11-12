import { Inject, Injectable } from '@nestjs/common';
import { UserCreatedEvent } from '../../../common/dtos/user-created.event';
import { EmailRepositoryInterface } from '../../../shared/emails/repositories/email-repository.interface';
import { EmailFactoryInterface } from '../../../shared/emails/factories/email-factory.interface';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(EmailRepositoryInterface)
    private readonly emailRepository: EmailRepositoryInterface,

    @Inject(EmailFactoryInterface)
    private readonly emailFactory: EmailFactoryInterface,
  ) {}

  async execute(request: UserCreatedEvent): Promise<void> {
    const curEmail = await this.emailRepository.findOneByEmail(request.email);
    if (curEmail) {
      return;
    }
    const newEmail = this.emailFactory.createEmail(request.email);
    await this.emailRepository.insert(newEmail);
  }
}
