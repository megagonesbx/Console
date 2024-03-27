import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("RoleData")
export class RoleData {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;
}
