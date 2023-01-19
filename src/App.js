import './App.css';

import { Routes, Route, } from 'react-router-dom';


import Employer from './pages/Employer';
import Freelancer from './pages/Freelancer';
import Landing from './pages/Landing';
import Footer from './components/Footer';
import JobPost from './pages/JobPost';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/freelancer" element={<Freelancer />} />
        <Route exact path="/employer" element={<Employer />} />
        <Route exact path='/jobpost' element={<JobPost/> } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
