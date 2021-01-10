import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateTaskDto, GetTasksFilterDto } from './dto/task.model.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ITask } from './task.interface';
import { getManager } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  getTasksWithFilters(filterDto: GetTasksFilterDto): Promise<ITask[]> {
    const { status, search } = filterDto;
    const tasks = this.getTasks();

    // if (status) {
    //   tasks = tasks.filter((task) => task.status === status);
    // }
    //
    // if (search) {
    //   tasks = tasks.filter(
    //     (task) =>
    //       task.title.includes(search) || task.description.includes(search),
    //   );
    // }

    return tasks;
  }

  async getTasks(): Promise<ITask[]> {
    return await this.taskRepository.findAllTasks();
  }
  async getTaskById(id: string): Promise<ITask> {
    return await this.taskRepository.findById(id);
  }

  async createTask(createTaskRequest: CreateTaskDto): Promise<ITask> {
    return await this.taskRepository.createTask(createTaskRequest);
  }

  // updateTaskByStatus(id: string, status: TaskStatus): ITask {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
  //
  // deleteTask(id: string): void {
  //   const foundTask = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== foundTask.id);
  // }
}
