import styles from './Register.module.scss';

import { useState, useEffect } from 'react';

export const Register = () => {
  return (
    <>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form>
        <label>
          <span>Nome:</span>
          <input
            type='text'
            name='dislayName'
            placeholder='Nome do usuário'
            required
          />
          <span>Nome:</span>
          <input
            type='email'
            name='email'
            placeholder='E-mail do usuário'
            required
          />
          <span>Senha:</span>
          <input
            type='password'
            name='password'
            placeholder='Insira sua senha'
            required
          />
          <span>Confirme sua senha:</span>
          <input
            type='password'
            name='confirmPassword'
            placeholder='Confirme a sua senha'
            required
          />
        </label>
        <button className='btn'>Cadastrar</button>
      </form>
    </>
  );
};
