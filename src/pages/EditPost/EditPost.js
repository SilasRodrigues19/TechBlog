import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../contexts/AuthContext';
import { useFetchDocument, useUpdateDocument, useTitle } from '../../hooks';

import { Icon } from '@iconify/react';

export const EditPost = () => {
  useTitle('Tech Blog | Criar postagem');

  const { id } = useParams();
  const { document: post } = useFetchDocument('posts', id);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');


  useEffect(() => {

    if(post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);

      const textTags = post.tagsArray.join(", ");
      setTags(textTags);
    }

  }, [post])


  const { updateDocument, response } = useUpdateDocument('posts');

  const { user } = useAuthValue();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());

    if (!title || !image || !tags || !body) {
      setFormError('Por favor, preencha todos os campos');
    }

    try {
      new URL(image);
    } catch (error) {
      setFormError('A imagem precisa ser uma URL');
    }

    if (formError) return;

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    }

    updateDocument(id, data);

    navigate('/dashboard');
  };

  return (
    <div>
      {post && (
        <>
          <h2 className='text-3xl font-bold mb-4 text-center'>
            Editando post: <span className='font-normal'>{post.title}</span>
          </h2>
          <p className='text-gray-500 mb-6 text-center'>
            Altere os dados do post como desejar
          </p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título:</span>
              <input
                type='text'
                name='title'
                required
                placeholder='Pense em um bom título'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>

            <label>
              <span>URL da imagem:</span>
              <input
                type='text'
                name='image'
                required
                placeholder='Insira uma imagem que representa o seu post'
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>

            <div>
              <p className='text-gray-800 font-bold my-2 text-center'>
                Preview da imagem atual:
              </p>
              <img
                src={post.image}
                alt={post.title}
                className='max-w-full mb-4 rounded-lg shadow-sm'
              />
            </div>

            <label>
              <span>Conteúdo:</span>
              <textarea
                name='body'
                required
                placeholder='Insira o conteúdo do post'
                onChange={(e) => setBody(e.target.value)}
                value={body}
              ></textarea>
            </label>

            <label>
              <span>Tags:</span>
              <input
                type='text'
                name='tags'
                required
                placeholder='Insira as tags separadas por vírgula'
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>
            {response.isLoading ? (
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
                Salvar
              </button>
            )}

            {response.error && (
              <div className='fixed bottom-0 right-0 mb-4 mr-4 border-2 bg-red-500 ring-2 ring-red-300 text-white px-4 py-2 rounded'>
                <div className='flex items-center'>
                  <Icon
                    className='dangerIcon text-xl mr-2'
                    icon='jam:triangle-danger-f'
                  />
                  <p>{response.error}</p>
                </div>
              </div>
            )}
            {formError && (
              <div className='fixed bottom-0 right-0 mb-4 mr-4 border-2 bg-red-500 ring-2 ring-red-300 text-white px-4 py-2 rounded'>
                <div className='flex items-center'>
                  <Icon
                    className='dangerIcon text-xl mr-2'
                    icon='jam:triangle-danger-f'
                  />
                  <p>{formError}</p>
                </div>
              </div>
            )}
          </form>
        </>
      )}
    </div>
  );
};
