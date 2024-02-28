import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOption: DataSourceOptions = {
  type: 'mysql',
  database: 'migration_and_seeders',
  username: 'root',
  password: '1234',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migration/*.js'],
};

const dataSource = new DataSource(dataSourceOption);
export default dataSource;
