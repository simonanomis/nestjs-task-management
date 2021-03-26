import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as moment from 'moment';
import { ETaskStatus } from './task.enums';
import { User } from '../auth/user.entity';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

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
  status: ETaskStatus;

  @Column('integer', {
    nullable: false,
    name: 'created_at',
  })
  createdAt: number;

  @ManyToOne((type) => User, (user) => user.tasks, { eager: false })
  user: User;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = moment().utc().unix();
  }
}
