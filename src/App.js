import Header from './components/header/Header';
import Content from './components/content/Content';
import Footer from './components/footer/Footer';
import './App.css';


function MessageList() {

  return (
    <div className='app-container'>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default MessageList;
