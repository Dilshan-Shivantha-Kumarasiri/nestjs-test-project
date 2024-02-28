import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AuthCredentials {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
