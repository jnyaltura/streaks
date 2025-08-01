import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  case: string;

  @Column()
  date: string;

  @Column()
  activities: number; // was: string[] -> now: number
}
