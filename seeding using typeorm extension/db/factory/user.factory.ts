import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../src/user/entities/user.entity';
import { Faker } from '@faker-js/faker';

const userFactory = setSeederFactory(User, (faker: Faker) => {
  const user = new User();
  user.name = faker.person.firstName();
  return user;
});

export default userFactory;
