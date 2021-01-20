import {
  AbstractRepository,
  EntityRepository,
  SelectQueryBuilder,
} from 'typeorm';
import { Task } from './task.entity';
import { ITask } from './task.interface';
import { ETaskStatus } from './task.enums';
import { NotFoundException } from '@nestjs/common';
import { CreateTaskDto, GetTasksFilterDto } from './dto/task.model.dto';

@EntityRepository(Task)
export class TaskRepository extends AbstractRepository<Task> {
  async findById(id: string): Promise<ITask> {
    const task = await this.repository.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  async createTask(createTaskRequest: CreateTaskDto): Promise<ITask> {
    const taskObj: Task = new Task();
    taskObj.title = createTaskRequest.title;
    taskObj.description = createTaskRequest.description;
    taskObj.status = ETaskStatus.OPEN;
    return await this.repository.save(taskObj);
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<ITask[]> {
    const { status, search } = filterDto;
    const getTasksQueryBuilder: SelectQueryBuilder<Task> = this.repository.createQueryBuilder(
      'taskmanagement',
    );
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

    return await getTasksQueryBuilder.getMany();
  }

  async deleteTask(id: string) {
    const result = await this.repository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
