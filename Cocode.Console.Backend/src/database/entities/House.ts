import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('HouseData')
export class HouseData {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, nullable: false })
  homeAddress!: string;

  @Column({ nullable: false })
  ownerName!: string;

  @Column({ nullable: false })
  ownerDPI!: string;

  @Column({ nullable: false })
  phoneNumber!: number;

  @Column({ default: false, nullable: false })
  solvent!: boolean;
}