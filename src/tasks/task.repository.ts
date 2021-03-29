import {
  AbstractRepository,
  EntityRepository,
  SelectQueryBuilder,
  getConnection,
} from 'typeorm';
import { Task } from './task.entity';
import { ITask } from './task.interface';
import { ETaskStatus } from './task.enums';
import { NotFoundException } from '@nestjs/common';
import { CreateTaskDto, GetTasksFilterDto } from './dto/task.model.dto';
import { User } from '../auth/user.entity';
import { query } from 'express';

@EntityRepository(Task)
export class TaskRepository extends AbstractRepository<Task> {
  async findById(id: string): Promise<Task> {
    const task = await this.repository.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  async createTask(createTaskRequest: CreateTaskDto): Promise<Task> {
    const taskObj: Task = new Task();
    taskObj.title = createTaskRequest.title;
    taskObj.description = createTaskRequest.description;
    taskObj.status = ETaskStatus.OPEN;
    taskObj.userId = createTaskRequest.userId;
    console.log('task repo:', taskObj);
    await this.repository.save(taskObj);
    return taskObj;
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const getTasksQueryBuilder: SelectQueryBuilder<Task> = this.repository.createQueryBuilder(
      'taskmanagement',
    );

    // getTasksQueryBuilder.where('taskmanagement.userId = :userId', {
    //   userId: user.id,
    // });

    if (status) {
      getTasksQueryBuilder.andWhere('taskmanagement.status= :status', {
        status,
      });
    }

    if (search) {
      getTasksQueryBuilder.andWhere(
        'taskmanagement.title LIKE :search OR taskmanagement.description LIKE :search',
        { search: `%${search}%` },
      );
    }

    //delete all
    //await getConnection().createQueryBuilder().delete().from(Task).execute();
    return await getTasksQueryBuilder.getMany();
  }

  async deleteTask(id: string) {
    const result = await this.repository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
