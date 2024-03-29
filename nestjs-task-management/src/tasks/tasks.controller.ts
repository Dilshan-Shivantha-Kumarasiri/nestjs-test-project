import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDTO } from "./dto/create-task-dto";
import { Task } from "./tasks.entity";
import { AuthGuard } from "@nestjs/passport";
import { User } from "../auth/user.entity";
import { GetUser } from "../auth/get-user.decorator";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get("/:id")
  getTaskById(@Param("id") id) {
    return this.taskService.getTaskById(id);
  }
  // @Get()
  // getAllTasks(@Query() getTasksFilter: GetTasksFilterDto): Task[] {
  //   if (Object.keys(getTasksFilter).length) {
  //     return this.taskService.getTasksWithFilters(getTasksFilter);
  //   } else {
  //     return this.taskService.getTasks();
  //   }
  // }
  // @Get("/:id")
  // getTaskById(@Param("id") id: string): Task {
  //   return this.taskService.getTaskById(id);
  // }
  // @Delete("/:id")
  // deleteTaskById(@Param("id") id: string): void {
  //   this.taskService.deleteTask(id);
  // }
  @Post()
  creteTask(
    @Body() createTaskDTO: CreateTaskDTO,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDTO, user);
  }
}
