import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { AuthCredentials } from "./dto/auth.credentials";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async createUser(authCredentials: AuthCredentials): Promise<void> {
    const user = this.userRepository.create(authCredentials);
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    await this.userRepository.save(user);
  }

  async validUser(
    authCredentials: AuthCredentials,
  ): Promise<{ accessToken: string }> {
    const { userName, password } = authCredentials;
    const user = await this.userRepository.findOne({
      where: { userName: userName },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { userName };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException("can  not authorized user");
    }
  }
}
