import logo from './logo.svg';
import './App.css';
import Colors from './pages/Colors';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/colors" element={<Colors/>}>
        </Route>
      </Routes>
    </Router>
    
  )
}

export default App;