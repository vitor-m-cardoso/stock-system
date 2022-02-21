import { Request, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/strategy/local-auth.guard';

@Controller('login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  @HttpCode(200)
  async loggedUser(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
