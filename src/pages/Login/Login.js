import styles from './Login.module.scss';

import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

import { Icon } from '@iconify/react';

export const Login = () => {

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
      <div className={styles.login}>
        <h1>Entrar</h1>
        <p>Informe seus dados para acessar o sistema.</p>
      </div>
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
          <button className='btn' disabled>
            Aguarde...
          </button>
        ) : (
          <button className='btn'>Entrar</button>
        )}

        {error && (
          <div className="error">
            <p>
              <Icon className='dangerIcon' icon='jam:triangle-danger-f' />
              {error}
            </p>
          </div>
        )}
      </form>
    </>
  );
};
