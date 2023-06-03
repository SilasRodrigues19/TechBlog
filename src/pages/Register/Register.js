import { useState, useEffect } from 'react';
import { useAuth, useTitle } from '../../hooks';

import { Icon } from '@iconify/react';

export const Register = () => {
  useTitle('Tech Blog | Faça seu cadastro');

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');

  const { createUser, error: authError, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    const user = {
      displayName,
      email,
      password,
    };

    if (password !== confirmPassword) {
      setError('As senhas precisam ser iguais');
      return;
    }

    const res = await createUser(user);

    console.log(res);
  };

  useEffect(() => {
    if (authError) setError(authError);
  }, [authError]);

  return (
    <>
      <div>
        <h1 className='text-3xl font-bold mb-4 text-center'>
          Cadastre-se para postar
        </h1>
        <p className='text-gray-500 my-2 text-center'>
          Crie seu usuário e compartilhe suas histórias
        </p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome:</span>
            <input
              type='text'
              name='displayName'
              placeholder='Nome do usuário'
              autoComplete='off'
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <span>Email:</span>
            <input
              type='email'
              name='email'
              placeholder='E-mail do usuário'
              autoComplete='off'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Senha:</span>
            <input
              type='password'
              name='password'
              placeholder='Insira sua senha'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Confirme sua senha:</span>
            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirme a sua senha'
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          {isLoading ? (
            <button
              className='w-full bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50'
              disabled
            >
              <Icon
                icon='eos-icons:bubble-loading'
                className='m-auto h-6'
                width='24'
                height='24'
              />
            </button>
          ) : (
            <button className='w-full bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50'>
              Cadastrar
            </button>
          )}

          {error && (
            <div className='fixed bottom-0 right-0 mb-4 mr-4 border-2 bg-red-500 ring-2 ring-red-300 text-white px-4 py-2 rounded'>
              <div className='flex items-center'>
                <Icon
                  className='dangerIcon text-xl mr-2'
                  icon='jam:triangle-danger-f'
                />
                <p>{error}</p>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
};
