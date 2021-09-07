import { internet } from 'faker';
import { hashSync } from 'bcrypt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';

interface IFindUserQuery {
  email: string;
}

describe('AuthService', () => {
  const fakeUserPassword = internet.password();

  const fakeUser: Pick<User, 'email' | 'password'> = {
    email: internet.email(),
    password: hashSync(fakeUserPassword, 10),
  };

  let service: AuthService;
  const mockUserRepository = {
    findOne: (query: IFindUserQuery) => {
      if (query.email === fakeUser.email) {
        return fakeUser;
      }

      return null;
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should be define', () => {
      expect(service.validateUser).toBeDefined();
    });

    it('should return null if there is no user with given password', async () => {
      const result = await service.validateUser(
        internet.email(),
        internet.password(),
      );

      expect(result).toBeNull();
    });

    it('should should return user if there valid email and password provided', async () => {
      const result = await service.validateUser(
        fakeUser.email,
        fakeUserPassword,
      );

      expect(result).toBe(fakeUser);
    });

    it('should return null if invalid password provided', async () => {
      const result = await service.validateUser(
        fakeUser.email,
        // random password
        internet.password(),
      );

      expect(result).toBeNull();
    });
  });
});
