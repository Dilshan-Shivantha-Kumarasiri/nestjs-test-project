import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../src/user/entities/user.entity';

export default class UserSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    // user seeder
    const userFactory = factoryManager.get(User);
    await userFactory.saveMany(7);
  }
}
