import { UserModel } from '../models/user.model';

export interface UserRepositoryInterface {
  findAll(): Promise<UserModel[]>;

  findOneById(id: string): Promise<UserModel | null>;

  getOneById(id: string): Promise<UserModel>;

  insert(user: UserModel): Promise<void>;

  update(user: UserModel): Promise<void>;

  delete(user: UserModel): Promise<void>;
}

export const UserRepositoryInterface = Symbol('UserRepositoryInterface');
