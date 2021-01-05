import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import {
  CreateTaskDto,
  GetTasksFilterDto,
  UpdateTaskDto,
} from './dto/task.model.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getTasks();
    }
  }

  @Get()
  getTasksWithFilters(@Query() filterDtoL: GetTasksFilterDto): Task[] {
    console.log(filterDtoL);
    return this.tasksService.getTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createRequest: CreateTaskDto): Task {
    return this.tasksService.createTask(createRequest);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskRequest: UpdateTaskDto,
  ): Task {
    return this.tasksService.updateTaskByStatus(id, updateTaskRequest);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    this.tasksService.deleteTask(id);
  }
}
