import { applyDecorators } from '@nestjs/common';
import { IsString, Length, ValidationOptions } from 'class-validator';

export function IsUserPassword(validationOptions?: ValidationOptions) {
  return applyDecorators(
    IsString(validationOptions),
    Length(4, undefined, validationOptions),
  );
}
