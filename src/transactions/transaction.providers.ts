import { User } from '../users/entities/user.entity';
import { DataSource } from 'typeorm';
import { Transaction } from './entities';
import { DATA_SOURCE, Repositories } from '../shared/constants';

export const transactionProviders = [
  {
    provide: Repositories.TRANSACTION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Transaction),
    inject: [DATA_SOURCE],
  },
  {
    provide: Repositories.USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE],
  },
];