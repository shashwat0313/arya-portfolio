import './App.css'
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PortfolioItems from './components/PortfolioItems';
import WorkExperience from './components/WorkExperience';
import Bio from './components/Bio';
import Certifications from './components/Certifications';
import HomeContent from './components/HomeContent';
// import Footer from './components/Footer';
import "./components/css/homecontent.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/works" element={<PortfolioItems />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/about" element={<Bio />} />
        <Route path="/contact" element={<WorkExperience />} />
        <Route path="/" element={<HomeContent></HomeContent>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
