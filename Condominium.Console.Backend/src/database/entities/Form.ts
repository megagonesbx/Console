import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('form')
export class FormData {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  paymentNumber!: number;

  @Column({ unique: true, nullable: false })
  dpi!: string;
}