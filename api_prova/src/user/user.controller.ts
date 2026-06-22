import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { CreateUserDTO, LoginDTO } from './user.dto';

@ApiTags('Usuários')
@Controller('user')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  @Post('create_user')
  @ApiOperation({ summary: 'Criar novo usuário' })
  @ApiBody({ type: CreateUserDTO })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou CPF já cadastrado' })
  async createUser(@Body() dto: CreateUserDTO) {
    const result = await firstValueFrom(
      this.userClient.send({ cmd: 'create_user' }, dto),
    );

    if (result.error)
      throw new HttpException(result.error, HttpStatus.BAD_REQUEST);

    return { message: 'Usuário criado com sucesso!', data: result };
  }

  @Post('login')
  @ApiOperation({ summary: 'Autenticação de usuário' })
  @ApiBody({ type: LoginDTO })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
  @ApiResponse({ status: 401, description: 'CPF ou senha inválidos' })
  async login(@Body() dto: LoginDTO) {
    const result = await firstValueFrom(
      this.userClient.send({ cmd: 'login' }, dto),
    );

    if (result.error)
      throw new HttpException(result.error, HttpStatus.UNAUTHORIZED);

    return { message: 'Login realizado com sucesso!', data: result };
  }

  @Get()
  @ApiOperation({ summary: 'Consultar todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso' })
  async getUsers() {
    const result = await firstValueFrom(
      this.userClient.send({ cmd: 'get_users' }, {}),
    );

    if (result.error)
      throw new HttpException(result.error, HttpStatus.INTERNAL_SERVER_ERROR);

    return { message: 'Usuários consultados com sucesso!', data: result };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar usuário por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async getUserById(@Param('id') id: number) {
    const result = await firstValueFrom(
      this.userClient.send({ cmd: 'get_user' }, { id }),
    );

    if (result.error)
      throw new HttpException(result.error, HttpStatus.NOT_FOUND);

    return { message: 'Usuário encontrado!', data: result };
  }
}