import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './component/Dashboard';

function App() {
  return (
    <div>
      {/* <header className="App-header"> */}

        <Router>
          <Routes>
          <Route path='/' element={<Dashboard/>}/>
          </Routes>
        </Router>
      {/* </header> */}
    </div>
  );
}

export default App;
