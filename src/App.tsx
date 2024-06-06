import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Maintenance from './pages/Maintenance';
import Alert from './components/Alert';

function App() {
  return (
    <Router>
      <div>
        <Header/>
      </div>

      <div className='App'>
        <Alert/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/maintenance' element={<Maintenance />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
