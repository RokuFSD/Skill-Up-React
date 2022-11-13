import './App.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import { Outlet } from 'react-router-dom';
import TitleBackground from './components/titleBkgd';

function App() {
  return (
    <>
      <Header />
      <main className={'flex flex-col items-center justify-center w-full min-h-main pb-20'}>
        <TitleBackground />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
