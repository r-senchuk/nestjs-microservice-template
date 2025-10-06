import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashInterface } from './hash.interface';

@Injectable()
export class HashService implements HashInterface {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
