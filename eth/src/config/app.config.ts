import { registerAs } from '@nestjs/config';

/* eslint-disable no-magic-numbers */
export default registerAs('common', () => ({
  nodeEnv: process.env.NODE_ENV,
  projectName: process.env.PROJECT_NAME,
  port: process.env.PORT || 9000,
  apiDocPath: process.env.API_DOC_PATH,
}));
