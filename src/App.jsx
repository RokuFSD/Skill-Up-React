import './App.css';
import Footer from './components/layout/sections/footer.jsx';
import Header from './components/layout/sections/header.jsx';
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
