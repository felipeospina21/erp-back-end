import { connect, disconnect, connection } from "mongoose";

export async function connectDB() {
  // if (connection) return;

  try {
    await connect(process.env.MONGODB_URI || "mongodb://localhost:27017/DLT");
    console.log('succesfully connected to DB');
  } catch (error) {
    console.log(error);
  }
}

export async function disconnectDB() {
  if (!connection) return;

  await disconnect();
}

export async function cleanup() {
  if (connection) {
    const promises = [];

    for (const collection in connection.collections) {
      promises.push(connection.collections[collection].deleteMany({}));
    }

    return await Promise.all(promises);
  }
}
