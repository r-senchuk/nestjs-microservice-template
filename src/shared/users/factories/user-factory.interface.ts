import { UserModel } from '../models/user.model';

export interface UserFactoryInterface {
  createUser(password: string, nickname: string, email: string): UserModel;
}

export const UserFactoryInterface = Symbol('UserFactoryInterface');
