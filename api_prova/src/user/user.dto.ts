import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({ example: 'João Silva', description: 'Nome completo do usuário' })
  nome!: string;

  @ApiProperty({ example: '123.456.789-00', description: 'CPF do usuário' })
  cpf!: string;

  @ApiProperty({ example: '(43) 99999-9999', description: 'Telefone do usuário' })
  telefone!: string;

  @ApiProperty({ example: 'MAT2024001', description: 'Matrícula do usuário' })
  matricula!: string;

  @ApiProperty({ example: 'senha123', description: 'Senha do usuário' })
  senha!: string;
}

export class LoginDTO {
  @ApiProperty({ example: '123.456.789-00', description: 'CPF do usuário' })
  cpf!: string;

  @ApiProperty({ example: 'senha123', description: 'Senha do usuário' })
  senha!: string;
}