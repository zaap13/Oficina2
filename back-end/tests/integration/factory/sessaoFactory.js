import { factory } from 'factory-girl';
import faker from 'faker';
import { Usuario } from '../src/models'; // Importe o modelo de usuário aqui

factory.define('Sessao', {}, async () => {
  const usuario = await factory.create('Usuario');
  // Lógica para criar uma sessão com base no usuário
  // Por exemplo, você pode usar algum método de autenticação para criar a sessão
  const token = 'TOKEN_GERADO'; // Simule um token de autenticação aqui
  return {
    usuario,
    token
  };
});
