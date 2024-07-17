import { UserFactoryInterface } from './user-factory.interface';
import { Injectable } from '@nestjs/common';
import { UserModel } from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserFactory implements UserFactoryInterface {
  createUser(password: string, nickname: string, email: string): UserModel {
    return new UserModel(uuidv4(), password, nickname, email);
  }
}
