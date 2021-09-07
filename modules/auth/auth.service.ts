import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { comparePasswords } from './helpers/password.helper';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      return null;
    }

    const match = await comparePasswords(password, user.password);

    if (match) {
      return user;
    }

    return null;
  }
}
