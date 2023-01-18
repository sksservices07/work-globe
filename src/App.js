import './App.css';

import { Routes, Route, } from 'react-router-dom';


import Employer from './pages/Employer';
import Freelancer from './pages/Freelancer';
import Landing from './pages/Landing';
import NavBar from './components/NavBar';


function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/freelancer" element={<Freelancer />} />
        <Route exact path="/employer" element={<Employer />} />
      </Routes>
    </div>
  );
}

export default App;
