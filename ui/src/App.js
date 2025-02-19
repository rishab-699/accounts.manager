import { useLocation } from 'react-router-dom';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/home/Home';
import About from './pages/about/About';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';

function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/dashboard';

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </>
  );
}

function App() {
  
  return (
      <div className="Dashboard">
        <Sidebar/>
        <div className="content">
          <BrowserRouter>
            <Navbar/>
            <Layout/>
          </BrowserRouter>
        </div>
    </div>
      
           
    
  );
}

export default App;
