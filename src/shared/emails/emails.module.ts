import { Module } from '@nestjs/common';
import { ParamsModule } from '../params/params.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailFactoryInterface } from './factories/email-factory.interface';
import { EmailFactory } from './factories/email-factory.service';
import { EmailRepositoryInterface } from './repositories/email-repository.interface';
import { EmailRepository } from './repositories/email-repository.service';
import { EmailSchema } from './schemas/email.schema';

const services = [
  {
    provide: EmailFactoryInterface,
    useClass: EmailFactory,
  },
  {
    provide: EmailRepositoryInterface,
    useClass: EmailRepository,
  },
];

@Module({
  providers: [...services],
  exports: [...services],
  imports: [ParamsModule, TypeOrmModule.forFeature([EmailSchema])],
})
export class EmailsModule {}
