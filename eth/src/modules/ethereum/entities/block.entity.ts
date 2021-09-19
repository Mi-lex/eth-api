import { Entity, OneToMany, PrimaryGeneratedColumn, Column } from 'typeorm';
import Transaction from './transaction.entity';

@Entity('blocks')
export default class Block {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  serialNumber: number;

  @OneToMany(() => Transaction, (transaction) => transaction.block, {
    cascade: true,
  })
  transactions: Transaction[];
}
