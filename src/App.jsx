import './App.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <main className={'w-full h-full pb-20'}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
