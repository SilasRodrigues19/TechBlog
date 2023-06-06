import { useState, useEffect, useReducer } from 'react';
import { db } from '../services/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const initialState = {
  loading: null,
  error: null,
  confirmDelete: false,
};

const deleteReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { loading: true, error: null };
    case 'DELETED_DOC':
      return { loading: false, error: null };
    case 'CONFIRM_DELETE':
      return {...state, confirmDelete: true}
    case 'ERROR':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useDeleteDocument = (docCollection) => {
  const [response, dispatch] = useReducer(deleteReducer, initialState);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const confirmDelete = (documentId) => {
    confirmAlert({
      message: 'Tem certeza que deseja deletar o post?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => {
            checkCancelBeforeDispatch({ type: 'CONFIRM_DELETE' });
            deleteDocument(documentId);
          },
        },
        {
          label: 'Não',
          onClick: () => {},
        },
      ],
    });
  };



  const deleteDocument = async (documentId) => {
    checkCancelBeforeDispatch({ type: 'LOADING' });

    try {
      const documentRef = doc(db, docCollection, documentId);
      const deletedDocument = await deleteDoc(documentRef);

      const deletedDocumentId = documentRef.id;

      checkCancelBeforeDispatch({
        type: 'DELETED_DOC',
        payload: deletedDocument,
        documentId: deletedDocumentId,
      });
    } catch (error) {
      checkCancelBeforeDispatch({ type: 'ERROR', payload: error.message });
    }
  };


  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { deleteDocument, confirmDelete, response };
};
