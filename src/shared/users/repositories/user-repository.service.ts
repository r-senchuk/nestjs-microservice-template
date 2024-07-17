import { UserRepositoryInterface } from './user-repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from '../models/user.model';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  async findAll(): Promise<UserModel[]> {
    return this.userRepository.find();
  }

  async findOneById(id: string): Promise<UserModel | null> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async getOneById(id: string): Promise<UserModel> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new UserNotFoundException(`User is not found by id "${id}"`);
    }

    return user;
  }

  async insert(user: UserModel): Promise<void> {
    await this.userRepository.insert(user);
  }

  async update(user: UserModel): Promise<void> {
    await this.userRepository.update(user.id, user);
  }

  async delete(user: UserModel): Promise<void> {
    await this.userRepository.delete(user.id);
  }
}
