import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { HouseData } from './index';

@Entity('payment')
export class PaymentData {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  ownerDPI!: string;

  @Column({ nullable: false })
  amount!: number;

  @Column({ nullable: false })
  month!: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: false })
  payedAt!: Date;

  @ManyToOne(() => HouseData, houseData => houseData.payments)
  house!: HouseData;
}