import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column({ type: 'bigint' })
  value: string;
}
