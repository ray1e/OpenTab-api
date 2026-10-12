import mongoose from "mongoose";
import { MongoMemoryReplSet } from "mongodb-memory-server";

let replset;

//start mongo memory db before tests in a file start
beforeAll(async () => {
  replset = await MongoMemoryReplSet.create({
    replSet: { count: 1 }, // 1 member is sufficient for testing
  });
  const uri = replset.getUri();
  await mongoose.connect(uri);
});

// clean up db after tests are done
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await replset.stop();
});

// clean up documents in a collection after each test
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
});
