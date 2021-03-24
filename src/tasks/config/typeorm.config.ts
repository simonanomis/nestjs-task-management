import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../../auth/user.entity';
import { Task } from '../task.entity';

export const ENTITIES = [User, Task];
export const connection: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'postgre',
  database: 'taskmanagement',
  entities: [...ENTITIES],
  synchronize: true,
};
