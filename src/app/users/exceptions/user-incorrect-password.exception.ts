import { BadRequestException } from '@nestjs/common';

export class UserIncorrectPasswordException extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}
