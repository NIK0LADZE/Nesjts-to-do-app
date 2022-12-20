import { AllowNull, Column, Model, Table, Unique } from 'sequelize-typescript';

@Table
export class User extends Model {
  @AllowNull(false)
  @Unique(true)
  @Column
  username: string;

  @AllowNull(false)
  @Column
  password: string;
}