import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailRepositoryInterface } from './email-repository.interface';
import { EmailModel } from '../models/email.model';
import { EmailNotFoundException } from '../exceptions/email-not-found.exception';

@Injectable()
export class EmailRepository implements EmailRepositoryInterface {
  constructor(
    @InjectRepository(EmailModel)
    private readonly emailRepository: Repository<EmailModel>,
  ) {}

  async findAll(): Promise<EmailModel[]> {
    return this.emailRepository.find();
  }

  async findOneById(id: string): Promise<EmailModel | null> {
    return this.emailRepository.findOne({
      where: { id },
    });
  }

  async getOneById(id: string): Promise<EmailModel> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new EmailNotFoundException(`Email is not found by id "${id}"`);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<EmailModel | null> {
    return this.emailRepository.findOne({
      where: { email },
    });
  }

  async getOneByEmail(email: string): Promise<EmailModel> {
    const res = await this.findOneByEmail(email);
    if (!res) {
      throw new EmailNotFoundException(`User is not found by email "${email}"`);
    }

    return res;
  }

  async insert(email: EmailModel): Promise<void> {
    await this.emailRepository.insert(email);
  }

  async update(email: EmailModel): Promise<void> {
    await this.emailRepository.update(email.id, email);
  }

  async delete(email: EmailModel): Promise<void> {
    await this.emailRepository.delete(email.id);
  }
}
