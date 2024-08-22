import { factory } from 'factory-girl';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../src/models/usuarioModel.js';

factory.define('Token', {}, async () => {
  const usuario = await Usuario.findOne({ email: 'admin@admin.admin' });

  const senhaValida = await bcrypt.compare('admin', usuario.senha);

  if (!senhaValida) {
    throw new Error('Senha inválida para o usuário admin.');
  }

  const token = jwt.sign(
    { usuarioId: usuario._id, nome: usuario.nome, email: usuario.email, tipo: usuario.tipo },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );

  return token;
});
