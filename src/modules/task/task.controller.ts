import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Task } from '@database/typeorm/entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

@ApiTags('Tasks')
@Controller('v1/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo mới một công việc' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Task })
  createTask(@Body() body: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lấy danh sách công việc' })
  @ApiResponse({ status: HttpStatus.OK, type: [Task] })
  getTasks(@Query() query: FilterTaskDto): Promise<Task[]> {
    return this.taskService.getTasks(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lấy chi tiết một công việc' })
  @ApiParam({ name: 'id', description: 'UUID của công việc' })
  @ApiResponse({ status: HttpStatus.OK, type: Task })
  getTaskById(@Param('id', ParseUUIDPipe) id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cập nhật thông tin công việc' })
  @ApiParam({ name: 'id', description: 'UUID của công việc' })
  @ApiResponse({ status: HttpStatus.OK, type: Task })
  updateTask(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Xóa một công việc' })
  @ApiParam({ name: 'id', description: 'UUID của công việc' })
  @ApiResponse({ status: HttpStatus.OK })
  deleteTask(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ message: string }> {
    return this.taskService.deleteTask(id);
  }
}
