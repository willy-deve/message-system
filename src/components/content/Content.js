import { useEffect, useState } from 'react';
import api from '../../api/api';
import LoadingModal from '../modals/loadingModal/LoadingModal';
import styled, { keyframes } from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import InputModal from '../modals/inputModal/InputModal';

const Card = styled.div`
  background-color: rgba(252, 253, 253, 0.9);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
  word-wrap: break-word;
  overflow: auto; 
  font-size: 1.1rem;
  line-height: 1.6;
  transition: transform 0.2s ease-in-out;
  position: relative;
  max-height: 230px; 
  min-height: 180px;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: scale(1.02);
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 10px;
    color: #333;
  }

  p {
    margin-bottom: 8px;
    color: #555;
  }
`;

const IconGroup = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  gap: 12px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1600px;
  border-radius: 15px;
  margin: 0 auto;
  padding: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  box-sizing: border-box;
  background-color: whitesmoke;
  gap: 20px;
  padding-bottom: 80px;
`;

const bounce = keyframes`
  0%, 100% {
    transform: translatey(0);
  }
  50% {
    transform: translatey(-15px);}
`

const Button = styled.button`
  position: fixed;
  bottom: 55px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 100%;
  width: 70px;
  height: 70px;
  font-size: 35px;
  cursor: pointer;

  animation: ${bounce} 2s ease-in-out infinite;
`

const MessageNotFound = styled.p`
  text-align: center;
  width: 100%;
  font-size: 1.2rem;
  color: #666;
  margin-top: 20px;
`

function Content() {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [messageToEdit, setMessageToEdit] = useState(null);

  const fetchAllMessages = async () => {

    await api.get('/all')
      .then(response => {
        setMessages(response.data);
        console.log('Mensagens carregadas:', response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar mensagens', error);
        setError('Erro ao carregar mensagens');
        setLoading(false);
      });

    return api;
  }


  const handleUpdate = (msg) => {
    setMessageToEdit(msg);
    setOpenModal(true);
  }

  const handleDelete = (id) => {
    const message = messages.filter(message => message.id !== id);
    setMessages(message);
    api.delete(`/delete/${id}`)
      .then(() => {
        console.log('Mensagem excluída com sucesso');
      })
      .catch(error => {
        console.error('Erro ao excluir mensagem', error);
        setError('Erro ao excluir mensagem');
      });
  }

  const handleOpenModal = () => {
    setOpenModal(true);
    setMessageToEdit(null);
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleAddMessage = (newMessage) => {
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setOpenModal(false)
  }

  useEffect(() => {
    fetchAllMessages();
  }, []);

  if (loading) return <LoadingModal message='Carregando mensagens...' />;
  if (error) return <LoadingModal message={error} />;

  return (
    <>
      <Container>
        {messages.length === 0 && <MessageNotFound>Nenhuma mensagem encontrada</MessageNotFound>}
        {messages.map((msg, index) => (
          <Card key={index}>
            <h3>Título: {msg.title}</h3>
            <p>Descrição: {msg.description}</p>
            <IconGroup>
              <IconButton onClick={() => handleUpdate(msg)} aria-label="editar">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(msg.id)} aria-label="excluir">
                <DeleteOutlineIcon />
              </IconButton>
            </IconGroup>
          </Card>
        ))}
        <InputModal
          show={openModal}
          onClose={handleCloseModal}
          onAddMessage={handleAddMessage}
          messageToEdit={messageToEdit}
        />
        <Button onClick={handleOpenModal}>+</Button>
      </Container>
    </>


  );
}

export default Content;