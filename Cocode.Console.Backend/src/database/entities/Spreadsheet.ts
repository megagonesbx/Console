import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('FormData')
export class SpreadsheetData {
  @PrimaryGeneratedColumn()
  Id!: number;

  @Column({ nullable: false })
  Name!: string;

  @Column({ unique: true, nullable: false })
  DPI!: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: false })
  CreatedAt!: Date;

  @Column({ nullable: false })
  PaymentMonth!: number;
}