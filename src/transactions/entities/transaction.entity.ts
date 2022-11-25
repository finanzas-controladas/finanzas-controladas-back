import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionTypes } from '../enums/transaction-type.enum';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 255,
    nullable: true,
  })
  note?: string;

  @Column('decimal', {
    nullable: false,
  })
  amount: number;

  @Column('date', {
    nullable: false,
  })
  date: Date;

  @Column('enum', {
    enum: TransactionTypes,
  })
  transactionType: TransactionTypes;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;
}
