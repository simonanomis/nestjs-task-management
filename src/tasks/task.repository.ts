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

  async findAllTasks(): Promise<ITask[]> {
    const getLicensesQueryBuilder: SelectQueryBuilder<Task> = this.repository.createQueryBuilder(
      'taskmanagement',
    );
    return await getLicensesQueryBuilder.getMany();
  }
}
