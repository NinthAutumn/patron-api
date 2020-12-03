import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalLoginDTO } from './dto/local-login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('local')
    async authenticateLocalUser(@Body() localLoginDTO: LocalLoginDTO) {
      return this.authService.localLogin(localLoginDTO);
    }
  
    async verifyUser() {}
}
