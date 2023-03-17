import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('donation')
export class DonationsData {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, nullable: false })
  donationNumber!: number;

  @Column({ nullable: false })
  quantity!: number;

  @Column({ nullable: true })
  donationPhoto!: string;

  @Column({ nullable: false })
  description!: string;

  @Column({ nullable: true })
  utilization!: string;
};