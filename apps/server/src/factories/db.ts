import { schemas } from '../../../../packages/schema';
import { Logger } from '@nestjs/common';
import { DefaultLogger, LogWriter } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import { GlobalConfig } from 'src/config';

let connection: mysql.Connection;

async function createConnection() {
  return await mysql.createConnection({
    uri: GlobalConfig.database_url,
    multipleStatements: true,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });
}

export async function endDB() {
  if (connection) {
    await connection.end();
    connection = null;
  }
}

export async function setupDB() {
  if (connection) return;

  const logger = new Logger('DB');

  class CustomDbLogWriter implements LogWriter {
    write(message: string) {
      logger.verbose(message);
    }
  }

  connection = await createConnection();

  return drizzle(connection, {
    schema: schemas,
    logger: new DefaultLogger({ writer: new CustomDbLogWriter() }),
    mode: 'planetscale',
  });
}
