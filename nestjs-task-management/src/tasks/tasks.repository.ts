import { Repository } from "typeorm";
import { Task } from "./tasks.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class TasksRepository extends Repository<Task> {}
