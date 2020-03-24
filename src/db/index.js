import mongoose from 'mongoose';
import config from '../config/db';

const { prefix, user, password, host, port, name, connectionQueryString } = config;

const dbURI = `${prefix}://${user}:${password}@${host}${port && ':' + port}/${name}?${connectionQueryString}`;
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
