import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Flight from './pages/Flight';

function App() {
  return (
    <>
        <Navbar/>
      <Routes>
         <Route path='/' element={<Home/>} />
         <Route path='flight' element={<Flight/>} />
       </Routes>
    </>
  );
}

export default App;
