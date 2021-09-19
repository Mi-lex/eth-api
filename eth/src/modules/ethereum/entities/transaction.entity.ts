import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Block from './block.entity';

@Entity('transactions')
export default class Transaction {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  from: string;

  @Column({ nullable: true })
  to: string;

  @Column({
    // type: 'bytea',
  })
  value: string;

  @ManyToOne(() => Block, (block) => block.transactions)
  block: Block;
}
