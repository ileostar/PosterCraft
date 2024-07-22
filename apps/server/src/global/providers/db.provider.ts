import { SchemaType } from '../../../../../packages/schema/src';
import { FactoryProvider } from '@nestjs/common';
import type { MySql2Database } from 'drizzle-orm/mysql2';
import { setupDB } from '../../common/db';

export const DB = Symbol('DB_SERVICE');
export type DbType = MySql2Database<SchemaType>;

export const DbProvider: FactoryProvider<DbType> = {
  provide: DB,
  useFactory: async () => {
    return await setupDB();
  },
};
