import { applyDecorators } from '@nestjs/common';
import { IsString, IsUUID, ValidationOptions } from 'class-validator';

export function IsUserId(validationOptions?: ValidationOptions) {
  return applyDecorators(
    IsString(validationOptions),
    IsUUID('all', validationOptions),
  );
}
