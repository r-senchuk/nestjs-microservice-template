import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { ParamsModule } from '../../shared/params/params.module';

@Module({
  imports: [ParamsModule],
  providers: [JwtStrategy],
  exports: [JwtStrategy],
})
export class JwtModule {}
