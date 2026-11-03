import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Task } from '@database/typeorm/entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(newTask);
  }

  async getTasks(filterDto: FilterTaskDto): Promise<Task[]> {
    const { isCompleted, category } = filterDto || {};
    const whereCondition: FindOptionsWhere<Task> = {};

    if (typeof isCompleted === 'boolean') {
      whereCondition.isCompleted = isCompleted;
    }

    if (category) {
      whereCondition.category = category;
    }

    return this.taskRepository.find({
      where: whereCondition,
      order: { createdAt: 'DESC' },
    });
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Tasks with ID ${id} not found`);
    }
    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const existingTask = await this.getTaskById(id);
    const updatedTask = this.taskRepository.merge(existingTask, updateTaskDto);
    return this.taskRepository.save(updatedTask);
  }

  async deleteTask(id: string): Promise<{ message: string }> {
    const existingTask = await this.getTaskById(id);
    await this.taskRepository.remove(existingTask);
    return { message: `Deleted task ${id} successfully` };
  }
}
