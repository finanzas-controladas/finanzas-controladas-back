import { Transaction } from 'src/transactions/entities/transaction.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 255,
  })
  fullname: string;

  @Column('varchar', {
    length: 60,
    unique: true,
  })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;
  
  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[]

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.email = this.email.toLowerCase().trim();
  }
}
