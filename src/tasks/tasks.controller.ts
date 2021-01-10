import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, GetTasksFilterDto } from './dto/task.model.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';
import { Task } from './task.entity';
import { ITask } from './task.interface';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
  ): Promise<ITask[]> {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getTasks();
    }
  }

  // @Get()
  // getTasksWithFilters(@Query() filterDtoL: GetTasksFilterDto): ITask[] {
  //   console.log(filterDtoL);
  //   return this.tasksService.getTasks();
  // }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<ITask> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createRequest: CreateTaskDto): Promise<ITask> {
    return this.tasksService.createTask(createRequest);
  }

  // @Patch('/:id/status')
  // updateTask(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  // ): ITask {
  //   return this.tasksService.updateTaskByStatus(id, status);
  // }
  //
  // @Delete('/:id')
  // deleteTask(@Param('id') id: string) {
  //   this.tasksService.deleteTask(id);
  // }
}
