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

factory.define('UsuarioComEmailDuplicado', {}, async () => {
  // Gera um e-mail aleatório
  const email = faker.internet.email();
  // Cria um usuário com o e-mail gerado para garantir a duplicação
  await factory.create('Usuario', { email });
  // Retorna um objeto com um e-mail duplicado
  return { nome: faker.name.findName(), email, tipo: 'admin' };
});

factory.define('UsuarioComTipoInvalido', {}, {
  nome: faker.name.findName(),
  email: faker.internet.email(),
  tipo: 'invalido'
});