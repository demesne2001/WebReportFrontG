import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './component/Dashboard';
import Setcontext from './component/Context/Setcontext';

function App() {
  return (
    <div>
      {/* <header className="App-header"> */}
      <Setcontext>
        <Router>
          <Routes>
          <Route path='/' element={<Dashboard/>}/>
          </Routes>
        </Router>
      {/* </header> */}
      </Setcontext>
    </div>
  );
}

export default App;
