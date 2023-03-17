import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('incident')
export class IncidentData {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  incidentName!: string;

  @Column({ nullable: false })
  description!: string;

  @Column({ nullable: true })
  incidentEvidence!: string;
}