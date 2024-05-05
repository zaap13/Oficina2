"use client"
import { useState } from 'react';
import Button from '@/components/Button.js';
import Input from '@/components/Input.js';
import { useRouter } from 'next/navigation';
import { register } from '@/services/apiService.js';

const RegisterPage = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [tipo, setTipo] = useState('');
  const [senhaGerada, setSenhaGerada] = useState('');
  const router = useRouter();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await register({ nome, email, tipo });
      console.log('response', response);
      const senha = response.senha;
      setSenhaGerada(senha);
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      // Tratar erros de cadastro, exibir mensagem para o usuário, etc.
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch h-screen">
      <div className="flex flex-col md:w-full items-center justify-center p-8 bg-gradient-to-b from-transparent to-neutral-900">
        <h1 className="text-3xl pb-8 text-center font-semibold text-white">
          Cadastro de Novo Usuário
        </h1>

        <form
          onSubmit={handleRegisterSubmit}
          className="flex flex-col items-center gap-4 w-full">
          <Input
            type="text"
            placeholder="Nome"
            required
            className="w-full"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <Input
            type="email"
            autoComplete="username"
            placeholder="E-mail"
            required
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="text"
            placeholder="Tipo (admin/aluno)"
            required
            className="w-full"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />

          <div className="w-full flex items-center justify-center">
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white mt-4">
              Cadastrar
            </Button>
          </div>
        </form>

        {senhaGerada && (
          <p className="text-white mt-4">
            Senha gerada: {senhaGerada}
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
