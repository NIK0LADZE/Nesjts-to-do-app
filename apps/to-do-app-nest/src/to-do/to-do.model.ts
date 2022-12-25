import { AllowNull, Column, IsNumeric, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'ToDoList'})
export class ToDo extends Model {
  @AllowNull(false)
  @IsNumeric
  @Column
  userId: number;

  @AllowNull(false)
  @Column
  title: string;
}