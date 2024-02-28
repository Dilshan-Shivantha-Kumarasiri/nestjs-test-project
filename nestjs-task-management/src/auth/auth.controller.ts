import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentials } from "./dto/auth.credentials";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  signUp(@Body() authCredentials: AuthCredentials): void {
    this.authService.createUser(authCredentials);
  }
  @Post("/signin")
  signIn(
    @Body() authCredentials: AuthCredentials,
  ): Promise<{ accessToken: string }> {
    return this.authService.validUser(authCredentials);
  }
  @Post("/test")
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
