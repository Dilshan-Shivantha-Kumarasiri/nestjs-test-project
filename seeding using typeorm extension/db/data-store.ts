import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';


export const dataSourceOption: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  database: 'migration_and_seeders',
  username: 'root',
  password: '1234',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migration/*.js'],
  factories: ['dist/db/factory/*.factory.js'],
  seeds: ['dist/db/seeders/*.seeders.js'],
};

const dataSource = new DataSource(dataSourceOption);
export default dataSource;
