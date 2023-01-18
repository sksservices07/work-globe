import './App.css';
import Employer from './pages/Employer';
import Freelancer from './pages/Freelancer';
import Landing from './pages/Landing';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route exact path="/" element={<Landing/>} />
          <Route exact path="/freelancer" element={<Freelancer/>} />
          <Route exact path="/employer" element={<Employer/>} />
        </Routes>
    </div>
  );
}

export default App;
