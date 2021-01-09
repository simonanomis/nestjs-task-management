import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatus } from './task.model';
import * as moment from 'moment';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: number;

  @Column('text', {
    nullable: false,
    name: 'title',
  })
  title: string;

  @Column('text', {
    nullable: false,
    name: 'description',
  })
  description: string;

  @Column('text', {
    nullable: false,
    default: 'OPEN',
    name: 'status',
  })
  status: TaskStatus;

  @Column('integer', {
    nullable: false,
    name: 'created_at',
  })
  createdAt: number;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = moment().utc().unix();
  }
}
