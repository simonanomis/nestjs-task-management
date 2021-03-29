import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, GetTasksFilterDto } from './dto/task.model.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';
import { Task } from './task.entity';
import { ITask } from './task.interface';
import { ETaskStatus } from './task.enums';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, user);
  }

  // @Get()
  // getTasksWithFilters(@Query() filterDtoL: GetTasksFilterDto): ITask[] {
  //   console.log(filterDtoL);
  //   return this.tasksService.getTasks();
  // }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Body() createRequest: CreateTaskDto): Promise<Task> {
    console.log('task con:', createRequest.userId);
    return await this.tasksService.createTask(createRequest);
  }

  // @Patch('/:id/status')
  // updateTask(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: ETaskStatus,
  // ): Promise<ITask> {
  //   return this.tasksService.updateTaskByStatus(id, status);
  // }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}
