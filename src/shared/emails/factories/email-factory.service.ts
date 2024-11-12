import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { EmailFactoryInterface } from './email-factory.interface';
import { EmailModel } from '../models/email.model';

@Injectable()
export class EmailFactory implements EmailFactoryInterface {
  createEmail(email: string): EmailModel {
    return new EmailModel(uuidv4(), email);
  }
}
