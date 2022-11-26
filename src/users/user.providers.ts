import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { DATA_SOURCE, Repositories } from '../shared/constants';
import { Transaction } from '../transactions/entities';

export const userProviders = [
  {
    provide: Repositories.USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE],
  },
  {
    provide: Repositories.TRANSACTION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Transaction),
    inject: [DATA_SOURCE],
  },
];