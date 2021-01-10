import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ETaskStatus } from '../task.enums';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    ETaskStatus.OPEN,
    ETaskStatus.IN_PROGRESS,
    ETaskStatus.DONE,
  ];

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}
