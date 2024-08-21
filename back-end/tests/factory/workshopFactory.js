import { factory } from 'factory-girl';
import faker from 'faker';
import Workshop from '../src/models/workshopModel.js';
import Usuario from '../src/models/usuarioModel.js';

factory.define('Workshop', Workshop, {
  titulo: faker.lorem.words(3),
  descricao: faker.lorem.sentence(),
  data: faker.date.future(),
  vagas: faker.random.number({ min: 1, max: 30 }),
  alunosInscritos: [],
});

factory.define('Usuario', Usuario, {
  nome: faker.name.findName(),
  email: faker.internet.email(),
  senha: faker.internet.password(),
  tipo: 'aluno',
});
