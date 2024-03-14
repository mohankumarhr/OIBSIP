import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Home from './Home';
import Secret from './Secret';

function App() {
  return (
    <div>
    <Router>
     <div className='app-container'>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/secret" element={<Secret />} />
    </Routes>
    </div>
    </Router>
    </div>
  )
}

export default App