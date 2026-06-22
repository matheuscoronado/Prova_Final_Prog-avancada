import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  nome!: string;

  @Unique
  @Column({ type: DataType.STRING, allowNull: false })
  cpf!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  telefone!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  matricula!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  senha!: string;
}
