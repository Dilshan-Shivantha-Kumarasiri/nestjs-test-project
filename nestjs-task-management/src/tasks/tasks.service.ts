import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskStatus } from "./tasks-status.enum";
import { CreateTaskDTO } from "./dto/create-task-dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TasksRepository } from "./tasks.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./tasks.entity";
import { UUID } from "typeorm/driver/mongodb/bson.typings";
import { QueryFailedError } from "typeorm";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: TasksRepository,
  ) {}

  // private id = 0;
  // private tasks: Task[] = [];
  // getTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //
  //   let tasks = this.getTasks();
  //   if (status) {
  //     tasks = tasks.filter((tasks) => tasks.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((tasks) => {
  //       if (
  //         tasks.title.includes(search) ||
  //         tasks.description.includes(search)
  //       ) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }
  // createTask(createTaskDTO: CreateTaskDTO) {
  //   const { title, description } = createTaskDTO;
  //   const task: Task = {
  //     id: (this.id += 1).toString(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id: id },
    });
    if (!task) {
      throw new NotFoundException(`task can not found by given ${id} id`);
    }
    return task;
  }
  async createTask(createTask: CreateTaskDTO) {
    const { title, description } = createTask;
    const tasks = {
      title,
      description,
      status: TaskStatus.OPEN,
    };
    const task = await this.tasksRepository.save(tasks);
    if (!task) {
      throw new Error("can not create task");
    }
    return task;
  }

  // getTaskById(id: string): Task {
  //   const tasks = this.tasks.find((element) => element.id === id);
  //   if (!tasks) {
  //     throw new NotFoundException("task can not found");
  //   }
  //   return tasks;
  // }
  // deleteTask(id: string): void {
  //   this.tasks = this.tasks.filter((task) => task.id != id);
  // }
  // // todo: need to implement update task
}
