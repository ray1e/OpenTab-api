import mongoose from "mongoose";
import { MongoMemoryReplSet } from "mongodb-memory-server";

let replset;

beforeAll(async () => {
  replset = await MongoMemoryReplSet.create({
    replSet: { count: 1 }, // 1 member is sufficient for testing
  });
  const uri = replset.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await replset.stop();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
});
