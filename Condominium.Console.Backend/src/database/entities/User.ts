import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { RoleData } from './index';

@Entity('user')
export class UserData {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  displayName!: string;

  @Column({ unique: true, nullable: false })
  email!: string;

  @ManyToOne(() => RoleData, roleData => roleData.id)
  role!: RoleData;
}