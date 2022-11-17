import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TransactionType } from "../enums/transaction-type.enum";

@Entity('transactions')
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', {
        length: 255,
        nullable: true,
    })
    note?: string

    @Column('double', {
        nullable: false,
    })
    amount: number

    @Column('date', {
        nullable: false,
    })
    date: Date

    @Column('enum', {
        enum: TransactionType
    })
    transactionType: TransactionType

    @ManyToOne(() => User, (user) => user.transactions)
    user: User
}