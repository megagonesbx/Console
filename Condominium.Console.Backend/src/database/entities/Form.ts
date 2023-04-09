import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('FormData')
export class SpreadsheetData {
  @PrimaryGeneratedColumn()
  Id!: number;

  @Column({ nullable: false })
  Name!: string;

  @Column({ nullable: false })
  PaymentNumber!: number;

  @Column({ unique: true, nullable: false })
  DPI!: string;
}