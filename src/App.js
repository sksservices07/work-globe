import './App.css';

import { Routes, Route, } from 'react-router-dom';


import Employer from './pages/Employer';
import Freelancer from './pages/Freelancer';
import Landing from './pages/Landing';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/freelancer" element={<Freelancer />} />
        <Route exact path="/employer" element={<Employer />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
