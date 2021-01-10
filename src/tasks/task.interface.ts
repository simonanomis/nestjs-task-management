import { ETaskStatus } from './task.enums';

export interface ITaskData {
  title: string;
  description: string;
  status: ETaskStatus;
}

export interface ITask extends ITaskData {
  id: string;
}
