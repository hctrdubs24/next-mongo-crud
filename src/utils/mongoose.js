import { connect, connection } from "mongoose";

const conn = {
  isConnected: false,
};

/**
 * "If the connection is already established, return. Otherwise, connect to the database and set the
 * connection status to true."
 * 
 * The first thing we do is check if the connection is already established. If it is, we return. If it
 * isn't, we connect to the database and set the connection status to true.
 * 
 * The connect() function is imported from the mongoose library. It takes a single argument, which is
 * the URL of the database.
 * 
 * The process.env.MONGODB_URL is an environment variable that contains the URL of the database.
 * 
 * The db.connections[0].readyState is a property that returns the status of the connection.
 * 
 * The db.connection.db.databaseName is a property that returns the name of the database.
 * 
 * The console.log() function is used to print the name of the database to the
 * @returns The connection object.
 */
export const dbConnection = async () => {
  if (conn.isConnected) return;

  const db = await connect(process.env.MONGODB_URL);
  conn.isConnected = db.connections[0].readyState;

  console.log(db.connection.db.databaseName);
};

connection.on("connected", () => console.log("MongoDB is connected"));
connection.on("error", (error) => console.log(error));
