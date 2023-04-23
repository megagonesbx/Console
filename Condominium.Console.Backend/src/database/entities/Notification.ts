import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserData } from './index';

@Entity()
export class MyTable {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: false })
  createdAt!: Date;

  @ManyToOne(() => UserData, userData => userData.Email)
  user!: UserData;

  @Column({ default: false })
  viewed!: boolean;

  @Column({ default: false })
  deleted!: boolean;

  @Column({ nullable: false })
  message!: string;
}
