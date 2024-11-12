import { Transport } from '@nestjs/microservices';
import { KafkaOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface';
import * as process from 'process';
import { APP_ID } from '../constants';

export const kafkaConfigs: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: APP_ID,
      brokers: [process.env.KAFKA_CONSUMER as string],
    },
    consumer: {
      groupId: APP_ID,
    },
    subscribe: {
      fromBeginning: true,
    },
    run: {
      autoCommit: false,
    },
  },
};
