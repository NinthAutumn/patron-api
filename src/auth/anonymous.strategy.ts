// import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
// import { JwtPayload } from './dto/jwt-payload.dto.t';
import { Strategy } from 'passport-anonymous';
import passport = require('passport');

@Injectable()
export class AnonymousStrategy extends PassportStrategy(Strategy, 'anonymous') {
  constructor() {
    super();
    // passport.use('anonymous', Strategy)
  }
}
