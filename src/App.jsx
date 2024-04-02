import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import About from './components/About';
import Home from './components/Home';
import "./styles/styles.css";
import portfolioLogo from "./images/favicon.svg"

function App() {
  return (
    <Router>
      <div>
        <header>
          <nav className='header-nav'>
            <a>
              <Link to="/">
                <img className="logo" src={portfolioLogo} alt="" />
              </Link>
            </a>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// must do npm install react-router-dom to use React Router for changing url paths