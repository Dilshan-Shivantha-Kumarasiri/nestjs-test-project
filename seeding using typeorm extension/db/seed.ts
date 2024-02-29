import dataSource from './data-store';
import { runSeeders } from 'typeorm-extension';
import * as process from 'process';

dataSource.initialize().then(async () => {
  await runSeeders(dataSource);
  process.exit();
});
