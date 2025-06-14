import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNameObj = {
  blogCollection: "blogs",
  userCollection: "users",
};

let cachedClient = null;

export default function dbConnect(collectionName) {
  const uri = process.env.Mongo_URI;
  const dbName = process.env.DB_NAME;

  if (!uri) {
    throw new Error("❌ Mongo_URI environment variable is not set.");
  }

  if (!dbName) {
    throw new Error("❌ DB_NAME environment variable is not set.");
  }

  // Optional: reuse the client for performance in serverless environments
  if (!cachedClient) {
    cachedClient = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }

  return cachedClient.db(dbName).collection(collectionName);
}
