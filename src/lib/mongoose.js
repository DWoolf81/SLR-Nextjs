// lib/mongoose.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  console.log("Attempting to connect")
  if (cached.conn) {
    console.log("Connection already established")
    return cached.conn;
  }

  if (!cached.promise) {
   

    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
        console.log("MongoDB connection successful")
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;