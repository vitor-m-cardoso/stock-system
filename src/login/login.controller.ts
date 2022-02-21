import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginUserDto } from './dto/login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @HttpCode(200)
  async loggedUser(@Body() loginUserDto: LoginUserDto) {
    return this.loginService.loggedUser(loginUserDto);
  }
}
