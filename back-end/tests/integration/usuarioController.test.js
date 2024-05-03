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
});
