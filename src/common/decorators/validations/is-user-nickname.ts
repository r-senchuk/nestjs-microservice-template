import { applyDecorators } from '@nestjs/common';
import { IsString, Length, ValidationOptions } from 'class-validator';

export function IsUserNickname(validationOptions?: ValidationOptions) {
  return applyDecorators(
    IsString(validationOptions),
    Length(3, undefined, validationOptions),
  );
}
