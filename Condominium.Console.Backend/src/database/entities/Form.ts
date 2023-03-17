import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('form')
export class FormData {
  @PrimaryGeneratedColumn()
  Id!: number;

  @Column({ nullable: false })
  Name!: string;

  @Column({ nullable: false })
  PaymentNumber!: number;

  @Column({ unique: true, nullable: false })
  DPI!: string;
}