import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from "./task.model";
import { CreateTaskDto, UpdateTaskDto } from "./dto/task.model.dto";

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
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
  updateTask(@Param('id') id: string, @Body() updateTaskRequest: UpdateTaskDto): Task {
    return this.tasksService.updateTaskByStatus(id, updateTaskRequest);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    this.tasksService.deleteTask(id);
  }
}
