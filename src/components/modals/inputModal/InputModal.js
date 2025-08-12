import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../../api/api';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: #fff;
  color: #222;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  max-width: 480px;
  width: 100%;
  font-family: 'Segoe UI', sans-serif;
  animation: fadeIn 0.4s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  h2 { margin-bottom: 20px; }
  form { display: flex; flex-direction: column; gap: 16px; }

  label {
    display: flex;
    flex-direction: column;
    font-weight: 500;
    color: #444;
  }

  input, textarea {
    padding: 10px 12px;
    margin-top: 6px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
    transition: border-color 0.3s;
  }

  input:focus, textarea:focus {
    border-color: #0078d7;
    outline: none;
  }

  button {
    padding: 10px 14px;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
  }

  button[type='submit'] {
    background-color: #0078d7;
    color: white;
  }

  button[type='button'] {
    background-color: #eee;
    color: #333;
  }

  button:hover {
    filter: brightness(0.95);
  }
`;

function InputModal({ show, onClose, onAddMessage, messageToEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!show) {
      setTitle('');
      setDescription('');
    }
  }, [show]);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    onClose();
  }

  const saveNote = async () => {
    const data = { title: title, description: description };
    let response;

    try {
      if (messageToEdit) {
        response = await api.put(`/update/${messageToEdit.id}`, data)
        console.log('Anotação atualizada com sucesso:', response.data);

      } else {
        response = await api.post('/save', data);
        console.log('Anotação adicionada com sucesso:', response.data);
      }

      if (onAddMessage) {
        onAddMessage(response.data);
      }

      resetForm();
    } catch (error) {
      console.error('Erro ao adicionar anotação:', error);
    }
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>{messageToEdit ? 'Editar anotação' : 'Adicionar anotação'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Título</p>
            <input
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            <p>Descrição</p>
            <textarea
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <button type="submit" onClick={saveNote}>salvar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}

export default InputModal;