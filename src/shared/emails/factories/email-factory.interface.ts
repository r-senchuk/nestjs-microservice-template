import { EmailModel } from '../models/email.model';

export interface EmailFactoryInterface {
  createEmail(email: string): EmailModel;
}

export const EmailFactoryInterface = Symbol('EmailFactoryInterface');
