import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsDefined,
  IsUUID,
} from 'class-validator';
import { ETaskStatus } from '../task.enums';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsDefined()
  @IsUUID()
  userId: string;
}

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([ETaskStatus.OPEN, ETaskStatus.IN_PROGRESS, ETaskStatus.DONE])
  status: ETaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
