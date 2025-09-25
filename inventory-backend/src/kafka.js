import { Kafka } from 'kafkajs';
import { processInventoryEvent } from './services/inventory.service.js';

const kafka = new Kafka({
  clientId: 'inventory-app',
  brokers: ['localhost:9092'] // Change if using Redpanda/Confluent
});

const consumer = kafka.consumer({ groupId: 'inventory-group' });
const producer = kafka.producer();

export async function initKafka() {
  await producer.connect();
  await consumer.connect();
  await consumer.subscribe({ topic: 'inventory-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const event = JSON.parse(message.value.toString());
      console.log("Received Event:", event);
      await processInventoryEvent(event); // Call FIFO logic
    },
  });
}

export { producer };
