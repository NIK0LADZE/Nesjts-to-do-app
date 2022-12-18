import { AllowNull, Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @AllowNull(false)
  @Column
  username: string;

  @AllowNull(false)
  @Column
  password: string;
}