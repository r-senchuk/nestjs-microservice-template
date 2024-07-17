import { createMockAppHelper } from '../helpers/create-mock-app.helper';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { ROUTES } from '../../src/constants';
import { HttpStatus } from '@nestjs/common';
import { createUrl } from '../helpers/url.helper';
import { DataSource } from 'typeorm';
import { genHex, genUuid } from '../helpers/faker.helper';
import { UserModel } from '../../src/shared/users/models/user.model';

describe('Get profile by user id functional tests', () => {
  let app: NestFastifyApplication;
  let dataSource: DataSource;

  const mockUnauthorizedMessage = 'Unauthorized';

  beforeAll(async () => {
    // run REST api
    app = await createMockAppHelper();
    dataSource = app.get(DataSource);
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  beforeEach(async () => {
    await dataSource.getRepository(UserModel).delete({});
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('should fail when auth token is not provided in header', async () => {
    return app
      .inject({
        method: 'GET',
        headers: {
          authorization: 'Bearer ',
        },
        url: createUrl(ROUTES.PROFILE_GET_PROFILE),
      })
      .then((result) => {
        expect(result.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
        const payload = JSON.parse(result.payload);
        expect(payload.statusCode).toBe(HttpStatus.UNAUTHORIZED);
        expect(payload.message).toBe(mockUnauthorizedMessage);
      });
  });

  it('should fail due to invalid id', async () => {
    return app
      .inject({
        method: 'GET',
        url: createUrl(ROUTES.USERS_GET_USER).replace(':id', 'wewer'),
      })
      .then((result) => {
        expect(result.statusCode).toEqual(HttpStatus.BAD_REQUEST);
        const res = JSON.parse(result.payload);
        expect(res).toStrictEqual({
          message: ['id must be a UUID'],
          statusCode: 400,
        });
      });
  });

  it('should get user successfully', async () => {
    const model = new UserModel(genUuid(), genHex(), 'test', 'test@test.com');
    await dataSource.getRepository(UserModel).insert(model);

    return app
      .inject({
        method: 'GET',
        url: createUrl(ROUTES.USERS_GET_USER).replace(':id', model.id),
      })
      .then((result) => {
        expect(result.statusCode).toEqual(HttpStatus.OK);
        const res = JSON.parse(result.payload).data;
        expect(res.id).toBe(model.id);
      });
  });
});
