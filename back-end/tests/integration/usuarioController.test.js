import request from 'supertest';
import app from '../../src/app.js';

describe('Teste do controlador de usuários', () => {
  it('Deve criar um novo usuário', async () => {
 
    const novoUsuario = {
      nome: 'Alice',
      email: 'alice@example.com',
      tipo: 'coordenador'
    };

    // Faz uma solicitação POST para a rota /usuarios com os dados do novo usuário
    const response = await request(app)
      .post('/usuarios')
      .send(novoUsuario);

    // Verifica se a resposta possui o status HTTP 201 (Created)
    expect(response.status).toBe(201);

    // Verifica se a resposta possui uma mensagem de sucesso e uma senha
    expect(response.body).toHaveProperty('mensagem', 'Usuário cadastrado com sucesso');
    expect(response.body).toHaveProperty('senha');
  });

  it('Deve retornar um erro ao criar um usuário com e-mail duplicado', async () => {
    const novoUsuario = {
      nome: 'Bob',
      email: 'bob@example.com',
      tipo: 'coordenador'
    };

    // Cria um usuário com o mesmo e-mail antes de tentar criar o segundo
    await request(app)
      .post('/usuarios')
      .send(novoUsuario);

    // Tenta criar outro usuário com o mesmo email
    const response = await request(app)
      .post('/usuarios')
      .send(novoUsuario);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'E-mail já cadastrado');
  });

  it('Deve retornar um erro ao criar um usuário sem nome', async () => {
    const novoUsuario = {
      email: 'carol@example.com',
      tipo: 'coordenador'
    };

    const response = await request(app)
      .post('/usuarios')
      .send(novoUsuario);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('mensagem', 'Nome é obrigatório');
  });

  it('Deve retornar um erro ao criar um usuário com tipo inválido', async () => {
    const novoUsuario = {
      nome: 'David',
      email: 'david@example.com',
      tipo: 'invalido'
    };

    const response = await request(app)
      .post('/usuarios')
      .send(novoUsuario);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'Tipo de usuário inválido');
  });
});
