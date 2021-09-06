import Joi from 'joi';

export default Joi.object({
  // common
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PROJECT_NAME: Joi.string().default('eth-api'),
  PORT: Joi.number().default(9000),
  API_DOC_PATH: Joi.string().default('api/docs'),
  // postgres
  POSTGRES_HOST: Joi.string().default('localhost'),
  POSTGRES_PORT: Joi.number().default(5432),
  POSTGRES_USER: Joi.string().default('postgres'),
  POSTGRES_PASS: Joi.string().default('123'),
  POSTGRES_DB_NAME: Joi.string().default('postgres'),
});
