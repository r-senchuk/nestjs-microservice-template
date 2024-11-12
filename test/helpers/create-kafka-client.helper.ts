import { kafkaConfigs } from '../../src/app-queue/main.configs';
import { ClientKafka } from '@nestjs/microservices';

export const createKafkaClientHelper = (): ClientKafka => {
  const clientProxy = new ClientKafka({
    ...kafkaConfigs.options,
    subscribe: { fromBeginning: false },
  });

  return clientProxy;
};
