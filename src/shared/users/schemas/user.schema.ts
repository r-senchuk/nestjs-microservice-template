import { EntitySchema } from 'typeorm';
import { UserModel } from '../models/user.model';

export const UserSchema = new EntitySchema<UserModel>({
  name: 'UserModel',
  tableName: 'users',
  target: UserModel,
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
    password: {
      type: String,
    },
  },
});
