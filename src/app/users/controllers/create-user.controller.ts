import { Controller, Post, Body } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ROUTES, TAGS } from '../../../constants';
import { CreateUserBodyDto } from '../requests/create-user-body.dto';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';

@Controller()
export class CreateUserController {
  constructor(private useCase: CreateUserUseCase) {}

  @ApiTags(TAGS.USERS)
  @ApiOkResponse()
  @Post(ROUTES.USERS_CREATE_USER)
  execute(@Body() body: CreateUserBodyDto): Promise<void> {
    return this.useCase.execute(body);
  }
}
