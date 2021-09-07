import { ConfigType } from '@nestjs/config';
import { auth } from '../../../config';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  it('should be defined', () => {
    expect(
      new JwtStrategy({ jwtSecret: '123' } as ConfigType<typeof auth>),
    ).toBeDefined();
  });
});
