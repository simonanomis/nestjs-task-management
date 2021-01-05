import { TaskStatus } from '../task.model';

export class CreateTaskDto {
  title: string;
  description: string;
}

export class UpdateTaskDto {
  status: TaskStatus;
}

export class GetTasksFilterDto {
  status: TaskStatus;
  search: string;
}