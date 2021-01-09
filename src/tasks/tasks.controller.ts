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
import { ITask, TaskStatus } from './task.model';
import { CreateTaskDto, GetTasksFilterDto } from './dto/task.model.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): ITask[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getTasks();
    }
  }

  @Get()
  getTasksWithFilters(@Query() filterDtoL: GetTasksFilterDto): ITask[] {
    console.log(filterDtoL);
    return this.tasksService.getTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createRequest: CreateTaskDto): ITask {
    return this.tasksService.createTask(createRequest);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): ITask {
    return this.tasksService.updateTaskByStatus(id, status);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    this.tasksService.deleteTask(id);
  }
}
