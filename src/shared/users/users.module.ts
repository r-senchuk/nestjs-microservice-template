import { Module } from '@nestjs/common';
import { ParamsModule } from '../params/params.module';
import { UserFactoryInterface } from './factories/user-factory.interface';
import { UserFactory } from './factories/user-factory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './schemas/user.schema';
import { UserRepositoryInterface } from './repositories/user-repository.interface';
import { UserRepository } from './repositories/user-repository.service';

const services = [
  {
    provide: UserFactoryInterface,
    useClass: UserFactory,
  },
  {
    provide: UserRepositoryInterface,
    useClass: UserRepository,
  },
];

@Module({
  providers: [...services],
  exports: [...services],
  imports: [ParamsModule, TypeOrmModule.forFeature([UserSchema])],
})
export class UsersModule {}
