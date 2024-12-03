import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/navbar';
import Footer from './components/Footer/footer';
import { AuthProvide } from './context/AuthContext';

function App() {
  return (
    <>
      <AuthProvide >
      <Navbar/>
      <main className="min-h-screen max-w-7xl mx-auto">
        <Outlet />
      </main>
      <Footer/>
      </AuthProvide>
    </>
  );
}

export default App;
