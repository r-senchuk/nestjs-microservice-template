import * as Joi from 'joi';
import PARAMETERS from './params.constants';
import { NODE_ENV } from '../../common/constants';

export const validationSchema = Joi.object({
  [PARAMETERS.NODE_ENV]: Joi.string()
    .valid(
      NODE_ENV.development,
      NODE_ENV.production,
      NODE_ENV.test,
      NODE_ENV.provision,
    )
    .required(),
  [PARAMETERS.HTTP_PORT]: Joi.string().required(),
  [PARAMETERS.CORS_ORIGIN]: Joi.string().min(0).optional(),
  [PARAMETERS.JWT_IGNORE_EXPIRATION]: Joi.boolean().optional(),
  [PARAMETERS.DB_HOST]: Joi.string().required(),
  [PARAMETERS.DB_PORT]: Joi.number().required(),
  [PARAMETERS.DB_USER]: Joi.string().required(),
  [PARAMETERS.DB_PASSWORD]: Joi.string().required(),
  [PARAMETERS.DB_NAME]: Joi.string().required(),
  [PARAMETERS.JWT_AUTH_ALGORITHM]: Joi.string().required(),
  [PARAMETERS.JWT_AUTH_PUBLIC_KEY]: Joi.string().required(),
});
