import { useState, useEffect } from 'react';
import { useAuth, useTitle } from '../../hooks';

import { Icon } from '@iconify/react';

export const Login = () => {
  useTitle('Tech Blog | Faça login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const { login, error: authError, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    const user = {
      email,
      password,
    };

    const res = await login(user);

    console.log(res);
  };

  useEffect(() => {
    if (authError) setError(authError);
  }, [authError]);

  return (
    <>
      <div>
        <h1 className='text-3xl font-bold mb-4 text-center'>Entrar</h1>
        <p className='text-gray-500 my-2 text-center'>
          Faça login com seu e-mail e senha.
        </p>
        <form onSubmit={handleSubmit}>
          <label>
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
              Entrar
            </button>
          )}

          <div className='my-8 flex items-center'>
            <hr className='flex-grow border-gray-200 border-t' />
            <span className='px-8 text-gray-300'>ou</span>
            <hr className='flex-grow border-gray-200 border-t' />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <button className='w-full bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 flex items-center justify-center'>
              <Icon icon='akar-icons:google-fill' />
            </button>
            <button className='w-full bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 flex items-center justify-center'>
              <Icon icon='akar-icons:facebook-fill' />
            </button>
            <button className='w-full bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 flex items-center justify-center'>
              <Icon icon='akar-icons:twitter-fill' />
            </button>
            <button className='w-full bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 flex items-center justify-center'>
              <Icon icon='akar-icons:github-fill' />
            </button>
          </div>

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
