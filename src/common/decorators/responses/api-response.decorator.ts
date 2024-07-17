import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiResponse as ApiResponseSwagger,
  getSchemaPath,
} from '@nestjs/swagger';
import { SuccessResponse } from '../../responses/success.response';

export const ApiResponse = <TModel extends Type<any>>(
  model: TModel,
  status = HttpStatus.OK,
) => {
  return applyDecorators(
    ApiExtraModels(SuccessResponse),
    ApiExtraModels(model),
    ApiResponseSwagger({
      status,
      schema: {
        allOf: [
          { $ref: getSchemaPath(SuccessResponse) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(model),
              },
            },
          },
        ],
      },
    }),
  );
};
