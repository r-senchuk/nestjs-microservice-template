import { Consumer, Kafka } from 'kafkajs';
import { APP_ID } from '../../src/constants';

interface Callback {
  topic: string;
  callback: (message: any) => void;
}

export class KafkaConsumerHelper {
  private consumer: Consumer;
  private callbacks: Callback[] = [];

  constructor() {
    const kafka = new Kafka({
      clientId: APP_ID,
      brokers: [process.env.KAFKA_PRODUCER as string],
      logLevel: 0,
    });
    this.consumer = kafka.consumer({ groupId: APP_ID });
  }

  subscribe(topic: string, callback: (message: any) => void) {
    this.callbacks.push({ callback, topic });
  }

  async run() {
    await this.consumer.connect();
    await this.consumer.subscribe({
      topics: this.callbacks.map((el) => el.topic),
      fromBeginning: false,
    });
    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        const cb = this.callbacks.find((el) => el.topic === topic);
        if (cb) {
          cb.callback(JSON.parse(message.value!.toString()));
        }
      },
    });
  }

  async disconnect() {
    await this.consumer.disconnect();
  }
}
