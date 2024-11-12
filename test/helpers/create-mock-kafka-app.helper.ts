import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app-queue/app-queue.module';
import { kafkaConfigs } from '../../src/app-queue/main.configs';
import { INestMicroservice } from '@nestjs/common';

export const createMockKafkaAppHelper =
  async (): Promise<INestMicroservice> => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    return moduleFixture.createNestMicroservice(kafkaConfigs);
  };
