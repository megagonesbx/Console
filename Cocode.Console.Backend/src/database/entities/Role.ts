import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('role')
export class RoleData {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;
}