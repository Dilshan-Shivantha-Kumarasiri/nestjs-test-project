import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "../tasks/tasks.entity";
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ unique: true })
  userName: string;
  @Column()
  password: string;
  @OneToMany((type) => Task, (task) => task.user, { eager: true })
  tasks: Task;
}
