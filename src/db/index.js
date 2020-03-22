import mongoose from 'mongoose';
import config from '../config/db';

const dbURI = `mongodb://${config.user}:${config.password}@${config.host}:${config.port}/${config.name}?authSource=${config.authSource}`;
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

export async function connect() {
  try {
    await mongoose.connect(
      dbURI,
      dbOptions,
    );
  } catch (err) {
    console.log(err.message);
  }
}

export async function disconnect() {
  try {
    await mongoose.disconnect();
  } catch (err) {
    console.log(err.message);
  }
}
