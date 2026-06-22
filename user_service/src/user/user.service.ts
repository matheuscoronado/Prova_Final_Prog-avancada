import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDTO, LoginDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async createUser(dto: CreateUserDTO) {
    try {
      const cpfExistente = await this.userModel.findOne({
        where: { cpf: dto.cpf },
      });

      if (cpfExistente) {
        return { error: 'CPF já cadastrado' };
      }

      const senhaHash = await bcrypt.hash(dto.senha, 10);

      const user = await this.userModel.create({
        nome: dto.nome,
        cpf: dto.cpf,
        telefone: dto.telefone,
        matricula: dto.matricula,
        senha: senhaHash,
      });

      const { senha, ...resultado } = user.toJSON();
      return resultado;
    } catch (err) {
      return { error: 'Erro ao criar usuário: ' + err.message };
    }
  }

  async login(dto: LoginDTO) {
    try {
      const user = await this.userModel.findOne({
        where: { cpf: dto.cpf },
      });

      if (!user) {
        return { error: 'CPF ou senha inválidos' };
      }

      const senhaValida = await bcrypt.compare(dto.senha, user.senha);

      if (!senhaValida) {
        return { error: 'CPF ou senha inválidos' };
      }

      return {
        id: user.id,
        nome: user.nome,
        cpf: user.cpf,
        matricula: user.matricula,
      };
    } catch (err) {
      return { error: 'Erro ao realizar login: ' + err.message };
    }
  }

  async getUsers() {
    try {
      return await this.userModel.findAll({
        attributes: { exclude: ['senha'] },
      });
    } catch (err) {
      return { error: 'Erro ao consultar usuários: ' + err.message };
    }
  }

  async getUserById(id: number) {
    try {
      const user = await this.userModel.findByPk(id, {
        attributes: { exclude: ['senha'] },
      });

      if (!user) {
        return { error: 'Usuário não encontrado' };
      }

      return user;
    } catch (err) {
      return { error: 'Erro ao consultar usuário: ' + err.message };
    }
  }
}