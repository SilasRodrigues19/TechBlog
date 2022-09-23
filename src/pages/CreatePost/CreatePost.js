import styles from './CreatePost.module.scss';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';

import { Icon } from '@iconify/react';

export const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');
  const { insertDocument, response } = useInsertDocument('posts');

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

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    navigate('/');
  };

  return (
    <div className={styles.createPost}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser e compartilhe seu cnhecimento</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Pense em um bom título"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>

        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Insira uma imagem que representa o seu post"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>

        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            required
            placeholder="Insira o conteúdo do post"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>

        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira as tags separadas por vírgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {response.isLoading ? (
          <button className="btn" disabled>
            Aguarde...
          </button>
        ) : (
          <button className="btn">Cadastrar</button>
        )}

        {response.error && (
          <div className="error">
            <p>
              <Icon className="dangerIcon" icon="jam:triangle-danger-f" />
              {response.error}
            </p>
          </div>
        )}
        {formError && (
          <div className="error">
            <p>
              <Icon className="dangerIcon" icon="jam:triangle-danger-f" />
              {formError}
            </p>
          </div>
        )}
      </form>
    </div>
  );
};
