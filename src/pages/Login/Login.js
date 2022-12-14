import styles from './Login.module.scss';

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
      <div className={styles.login}>
        <h1>Entrar</h1>
        <p>Faça login com seu e-mail e senha.</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Email:</span>
            <input
              type="email"
              name="email"
              placeholder="E-mail do usuário"
              autoComplete="off"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Senha:</span>
            <input
              type="password"
              name="password"
              placeholder="Insira sua senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {isLoading ? (
            <button className="btn" disabled>
              Aguarde...
            </button>
          ) : (
            <button className="btn btn-full">Entrar</button>
          )}

          <hr className="divider" />

          <div className={styles.socialButtons}>
            <button className="btn">
              <Icon icon="akar-icons:google-fill" />
            </button>
            <button className="btn">
              <Icon icon="akar-icons:facebook-fill" />
            </button>
            <button className="btn">
              <Icon icon="akar-icons:twitter-fill" />
            </button>
            <button className="btn">
              <Icon icon="akar-icons:github-fill" />
            </button>
          </div>

          {error && (
            <div className="error">
              <p>
                <Icon className="dangerIcon" icon="jam:triangle-danger-f" />
                {error}
              </p>
            </div>
          )}
        </form>
      </div>
    </>
  );
};
