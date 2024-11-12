import { INestMicroservice } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { DataSource } from 'typeorm';
import { lastValueFrom } from 'rxjs';
import { createMockKafkaAppHelper } from '../helpers/create-mock-kafka-app.helper';
import { createKafkaClientHelper } from '../helpers/create-kafka-client.helper';
import { USERS_CREATED_TOPIC } from '../../src/common/constants';
import { UserCreatedEvent } from '../../dist/common/dtos/user-created.event';
import { EmailModel } from '../../src/shared/emails/models/email.model';
import { genEmail, genNickname, genUuid } from '../helpers/faker.helper';

describe('call create user event', () => {
  let app: INestMicroservice;
  let clientKafka: ClientKafka;
  let dataSource: DataSource;

  const createUserEventData: UserCreatedEvent = {
    id: genUuid(),
    nickname: genNickname(),
    email: genEmail(),
  };

  beforeAll(async () => {
    app = await createMockKafkaAppHelper();
    await app.listen();
    dataSource = app.get(DataSource);

    clientKafka = createKafkaClientHelper();
    clientKafka.subscribeToResponseOf(USERS_CREATED_TOPIC);
    await clientKafka.connect();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
    if (clientKafka) {
      await clientKafka.close();
    }
  });

  beforeEach(async () => {
    await dataSource.getRepository(EmailModel).delete({});
  });

  it('should call create user event successfully', async () => {
    expect.hasAssertions();
    await lastValueFrom(
      clientKafka.send(USERS_CREATED_TOPIC, createUserEventData),
    );
    expect('id').toBe('id');
    const blockchain = await dataSource
      .getRepository(EmailModel)
      .findOneBy({ email: createUserEventData.email });

    expect(blockchain).toEqual({
      email: createUserEventData.email,
      id: expect.any(String),
    });
  });
});
