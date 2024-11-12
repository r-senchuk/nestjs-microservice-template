import { EmailModel } from '../models/email.model';

export interface EmailRepositoryInterface {
  findAll(): Promise<EmailModel[]>;

  findOneById(id: string): Promise<EmailModel | null>;

  getOneById(id: string): Promise<EmailModel>;

  findOneByEmail(email: string): Promise<EmailModel | null>;

  getOneByEmail(email: string): Promise<EmailModel>;

  insert(user: EmailModel): Promise<void>;

  update(user: EmailModel): Promise<void>;

  delete(user: EmailModel): Promise<void>;
}

export const EmailRepositoryInterface = Symbol('EmailRepositoryInterface');
