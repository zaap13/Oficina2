import { factory } from 'factory-girl';
import faker from 'faker';

factory.define('Usuario', {}, {
  nome: faker.name.findName(),
  email: faker.internet.email(),
  tipo: 'admin'
});

factory.define('UsuarioSemNome', {}, {
  email: faker.internet.email(),
  tipo: 'admin'
});

factory.define('UsuarioComEmailDuplicado', {}, {
  nome: faker.name.findName(),
  email: async () => {
    const email = faker.internet.email();
    await factory.create('Usuario', { email });
    return email;
  },
  tipo: 'admin'
});


factory.define('UsuarioComTipoInvalido', {}, {
  nome: faker.name.findName(),
  email: faker.internet.email(),
  tipo: 'invalido'
});