import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AppRoutes from './features/AppRoutes';
import NavBar from './features/NavBar';

function App() {
  return (
    <Router>
      <div className="app">
        <h1>React on Rails</h1>
        <NavBar/>
        <AppRoutes/>
      </div>
    </Router>    
  )
}

export default App;
