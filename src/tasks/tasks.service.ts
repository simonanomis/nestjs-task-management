import { Injectable } from '@nestjs/common';
import { CreateTaskDto, GetTasksFilterDto } from './dto/task.model.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ITask } from './task.interface';
import { ETaskStatus } from './task.enums';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<ITask[]> {
    return await this.taskRepository.getTasks(filterDto);
  }
  async getTaskById(id: string): Promise<ITask> {
    return await this.taskRepository.findById(id);
  }

  async createTask(createTaskRequest: CreateTaskDto): Promise<ITask> {
    return await this.taskRepository.createTask(createTaskRequest);
  }

  async updateTaskByStatus(id: string, status: ETaskStatus): Promise<ITask> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.taskRepository.createTask(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    await this.taskRepository.deleteTask(id);
  }
}
