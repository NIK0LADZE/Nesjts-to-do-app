import { AllowNull, Column, IsNumeric, Model, Table } from 'sequelize-typescript';
import { ToDoInterface } from '@interfaces';

export interface UserToDo extends ToDoInterface {
  userId: number;
}

@Table({ tableName: 'ToDoList'})
export class ToDo extends Model implements UserToDo {
  @AllowNull(false)
  @IsNumeric
  @Column
  userId: number;

  @AllowNull(false)
  @Column
  title: string;
}