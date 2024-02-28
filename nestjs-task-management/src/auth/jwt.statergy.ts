import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "./jwt-payload.interface";
@Injectable()
export class JwtStatergy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User) private userRepository: UserRepository) {
    super({
      secretOrKey: "topsecret51",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { userName } = payload;
    const user: User = await this.userRepository.findOne({
      where: { userName: userName },
    });
    if (!user) {
      throw new UnauthorizedException("can not authorized");
    } else {
      return user;
    }
  }
}
