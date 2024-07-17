import { ConflictException } from '@nestjs/common';

export class UserAlreadyExistsexception extends ConflictException {
  constructor(message: string) {
    super(message);
  }
}
