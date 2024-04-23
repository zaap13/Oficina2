import { factory } from 'factory-girl';
import faker from 'faker';

factory.define('Usuario', {}, {
  nome: faker.name.findName(),
  email: faker.internet.email(),
  tipo: 'admin'
});
