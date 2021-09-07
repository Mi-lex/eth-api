import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity()
export default class Block {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToMany(() => Transaction, (transaction) => transaction.block, {
    cascade: true,
  })
  transactions: Transaction[];
}
