import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  unavailableUntil: number;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: CachedConnection | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null, unavailableUntil: 0 };
}

export async function connectDB() {
  if (cached!.conn) {
    return cached!.conn;
  }

  // If previous attempt failed recently (within 10s), fail fast to avoid blocking static builds
  if (Date.now() < cached!.unavailableUntil) {
    throw new Error('Database recently unreachable, failing fast.');
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 2000, // Fail in 2s if unreachable
    };

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m);
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    cached!.unavailableUntil = Date.now() + 10000;
    throw e;
  }

  return cached!.conn;
}

