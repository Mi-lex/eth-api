import { registerAs } from '@nestjs/config';

export default registerAs('etherscan', () => ({
  API_KEY: process.env.ETHERSCAN_API_KEY,
}));
