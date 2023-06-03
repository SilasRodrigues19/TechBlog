import { Link } from 'react-router-dom';

import { useAuthValue } from '../../contexts/AuthContext';
import { useTitle } from '../../hooks';

export const About = () => {
  useTitle('Tech Blog | Sobre');

  const { user } = useAuthValue();

  return (
    <section className='bg-gray-100 py-10 px-6'>
      <div className='max-w-3xl mx-auto text-center'>
        <h2 className='text-3xl text-gray-700 font-bold mb-8'>
          Sobre o <span className='text-gray-500'>Tech Blog</span>
        </h2>
        <p className='text-lg text-gray-500 mb-8'>
          Este projeto consiste em um blog feito com React para construção da
          interface do usuário e serviços do Firebase utilizados no Back End
        </p>
        <Link
          to={user ? '/post/create' : '/register'}
          className='inline-block bg-gray-700 hover:bg-gray-600 hover:text-white text-white px-8 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50'
        >
          Criar post
        </Link>
      </div>
    </section>
  );
};
