import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

export function BusinessGuard() {
  return applyDecorators(ApiBearerAuth(), UseGuards(JwtAuthGuard));
}
