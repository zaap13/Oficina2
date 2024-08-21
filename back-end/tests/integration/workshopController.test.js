import request from 'supertest';
import app from '../../src/app.js';
import { factory } from 'factory-girl';
import Workshop from '../../src/models/workshopModel.js';

describe('Workshop Controller', () => {
  it('Deve criar um novo workshop', async () => {
    const novoWorkshop = await factory.build('Workshop');

    const response = await request(app)
      .post('/workshops')
      .send(novoWorkshop);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('titulo', novoWorkshop.titulo);
  });

  it('Deve inscrever um aluno em um workshop', async () => {
    const workshop = await factory.create('Workshop');
    const usuario = await factory.create('Usuario');

    const response = await request(app)
      .post(`/workshops/${workshop._id}/inscrever`)
      .send({ usuarioId: usuario._id });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('mensagem', 'Aluno inscrito com sucesso');

    const workshopAtualizado = await Workshop.findById(workshop._id);
    expect(workshopAtualizado.alunosInscritos).toContainEqual(usuario._id);
  });

  it('Deve retornar erro ao tentar inscrever um aluno em um workshop sem vagas', async () => {
    const workshop = await factory.create('Workshop', { vagas: 0 });
    const usuario = await factory.create('Usuario');

    const response = await request(app)
      .post(`/workshops/${workshop._id}/inscrever`)
      .send({ usuarioId: usuario._id });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'Workshop sem vagas disponíveis');
  });
});
