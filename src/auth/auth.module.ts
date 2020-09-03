import { Module, Get, Body } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { LocalLoginDTO } from './dto/local-login.dto';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {
  constructor(private readonly authService: AuthService) {}
  @Get('local')
  async authenticateLocalUser(@Body() localLoginDTO: LocalLoginDTO) {
    return this.authService.localLogin(localLoginDTO);
  }

  async verifyUser() {}
}
