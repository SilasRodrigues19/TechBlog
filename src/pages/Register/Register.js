import styles from './Register.module.scss';

import { useState, useEffect } from 'react';

export const Register = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
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

    console.log(user);
  };

  return (
    <>
      <div className={styles.register}>
        <h1>Cadastre-se para postar</h1>
        <p>Crie seu usuário e compartilhe suas histórias</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type='text'
            name='dislayName'
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
        <button className='btn'>Cadastrar</button>
        {error && <p className='error'>{error}</p>}
      </form>
    </>
  );
};
