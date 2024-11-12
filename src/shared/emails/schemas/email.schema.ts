import { EntitySchema } from 'typeorm';
import { EmailModel } from '../models/email.model';

export const EmailSchema = new EntitySchema<EmailModel>({
  name: 'EmailModel',
  tableName: 'emails',
  target: EmailModel,
  indices: [
    {
      columns: ['email'],
    },
  ],
  columns: {
    id: {
      type: String,
      primary: true,
    },
    email: {
      type: String,
    },
  },
});
