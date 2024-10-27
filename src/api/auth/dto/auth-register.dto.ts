import { IsEmail, isEmail, IsNotEmpty, isNotEmpty, MinLength } from "class-validator";

export class AuthRegisterDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  @MinLength(5)
  password: string;
  
  address: string;
  
  @IsNotEmpty()
  phone: string;
}