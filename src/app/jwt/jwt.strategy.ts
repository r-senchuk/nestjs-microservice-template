import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PARAMETERS } from '../../shared/params/params.constants';
import { JwtPayloadDataDto } from '../../common/dtos/jwt-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(PARAMETERS.JWT_AUTH_PUBLIC_KEY) jwtPublicKey: string,
    @Inject(PARAMETERS.JWT_AUTH_ALGORITHM) jwtAlgorithm: string,
    @Inject(PARAMETERS.JWT_IGNORE_EXPIRATION) ignoreExpiration: boolean,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: ignoreExpiration,
      secretOrKey: jwtPublicKey,
      algorithms: [jwtAlgorithm],
    });
  }

  async validate(payload: JwtPayloadDataDto) {
    return payload;
  }
}
