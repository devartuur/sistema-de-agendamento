import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Env } from "../env";
import z from "zod";
import { Injectable } from "@nestjs/common";

const tokenSchema = z.object({
  sub: z.string().uuid()
})

export type TokenSchema = z.infer<typeof tokenSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<Env, true>) {
    const secret = config.get('SECRET_KEY')
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
      algorithms: ['HS256']
    })
  }
  
  validate(payload: TokenSchema): unknown {
    return tokenSchema.parse(payload)
  }

}