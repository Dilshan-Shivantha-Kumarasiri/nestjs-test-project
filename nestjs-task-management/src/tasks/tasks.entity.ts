import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../auth/user.entity";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status: string;
  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  user: User;
}
