import http from 'http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { handleRequest } from './router';

dotenv.config();

async function startServer() {
  const { default: db } = await import('./config/db');
  const { default: apiConfig } = await import('./config/api');
  const { ENV: env } = process.env;

  try {
    await mongoose.connect(
      `mongodb://${db.user}:${db.password}@${db.host}:${db.port}/${db.name}-${env}?authSource=${db.authSource}`,
      { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (err) {
    console.log(err.message);
  }

  http.createServer(handleRequest)
  .listen(apiConfig.port, apiConfig.host, () => {
    const { port, host } = apiConfig;
    console.log(`Server running at http://${host}:${port}/`);
  });
}

startServer();
