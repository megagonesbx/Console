import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('VisitorData')
export class VisitorData {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  dpi!: string;

  @Column({ nullable: false })
  homeAddress!: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: false })
  createdAt!: Date;
}