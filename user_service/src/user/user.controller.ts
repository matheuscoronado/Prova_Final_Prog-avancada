import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDTO, LoginDTO } from './user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'create_user' })
  createUser(@Payload() dto: CreateUserDTO) {
    return this.userService.createUser(dto);
  }

  @MessagePattern({ cmd: 'login' })
  login(@Payload() dto: LoginDTO) {
    return this.userService.login(dto);
  }

  @MessagePattern({ cmd: 'get_users' })
  getUsers() {
    return this.userService.getUsers();
  }

  @MessagePattern({ cmd: 'get_user' })
  getUserById(@Payload() data: { id: number }) {
    return this.userService.getUserById(data.id);
  }
}