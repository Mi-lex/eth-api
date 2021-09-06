import { registerAs } from '@nestjs/config';

export default registerAs('postgres', () => ({
  HOST: process.env.POSTGRES_HOST,
  PORT: process.env.POSTGRES_PORT,
  USER: process.env.POSTGRES_USER,
  PASS: process.env.POSTGRES_PASS,
  DB_NAME: process.env.POSTGRES_DB_NAME,
}));
