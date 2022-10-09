import styles from './Register.module.scss';

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
      <div className={styles.register}>
        <h1>Cadastre-se para postar</h1>
        <p>Crie seu usuário e compartilhe suas histórias</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome:</span>
            <input
              type="text"
              name="displayName"
              placeholder="Nome do usuário"
              autoComplete="off"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
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
            <span>Confirme sua senha:</span>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirme a sua senha"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          {isLoading ? (
            <button className="btn" disabled>
              Aguarde...
            </button>
          ) : (
            <button className="btn">Cadastrar</button>
          )}

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
