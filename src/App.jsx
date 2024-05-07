import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import About from './components/About';
import Home from './components/Home';
import ProjectDetails from './components/projectDetails';
import "./styles/styles.css";
import portfolioLogo from "./images/favicon.svg";
import github from "./images/github.svg";
import email from "./images/email.svg";
import linkedin from "./images/linkedin.svg";


// Get current year for footer
const currentYear = new Date().getFullYear();

function App() {
  return (
    <Router>
      <div>
        <header>
          <nav className='header-nav'>
            <a>
              <Link to="/">
                <img className="logo" src={portfolioLogo} alt="a logo with an orange circle background, fancy cursive font with the letters n and s in white and blue" />
              </Link>
            </a>
            <ul>
              <li>
                <Link to="/#projects-section">Projects</Link>
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
          <Route path="/project/:projectId" element={<ProjectDetails />} />
        </Routes>

        <footer>
          <nav className='footer-left'>
            <ul>
              <li>
                <Link to="/">
                  <img className="footer-logo" src={portfolioLogo} alt="a logo with an orange circle background, fancy cursive font with the letters n and s in white and blue" />
                </Link>
              </li>
            </ul>
          </nav>

          <nav className='footer-right'>
            <ul>
              <li>
                <a href="https://github.com/nicole-sedillo" target="_blank" rel="noopener noreferrer">
                  <img className="icon" src={github} alt="github logo" />
                </a>
              </li>
              <li>
                <a href="mailto:nicole.sedillo@gmail.com" target="_blank" rel="noopener noreferrer">
                  <img className="icon" src={email} alt="mail icon" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/nicolesedillo/" target="_blank" rel="noopener noreferrer">
                  <img className="icon" src={linkedin} alt="linkedin logo" />
                </a>
              </li>
            </ul>
          </nav>

          
        </footer>
      </div>
    </Router>
  );
}

export default App;
