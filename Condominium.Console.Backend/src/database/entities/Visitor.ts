import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { HouseData } from './index';

@Entity('visitor')
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

  @ManyToOne(() => HouseData, houseData => houseData.visitors)
  house!: HouseData;
}