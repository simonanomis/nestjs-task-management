import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { CreateTaskDto, GetTasksFilterDto, UpdateTaskDto } from "./dto/task.model.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getTasks();

    if(status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if(search) {
      tasks = tasks.filter(task =>
        task.title.includes(search) ||
        task.description.includes(search));
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createRequest: CreateTaskDto) {
    const { title, description } = createRequest;
    const task: Task = {
      id: uuid.v4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  updateTaskByStatus(id: string, updateRequest: UpdateTaskDto): Task {
    const task: Task = this.getTaskById(id);
    task.status = updateRequest.status;
    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

}
