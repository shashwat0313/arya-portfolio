import './App.css'
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PortfolioItems from './components/PortfolioItems';
// import WorkExperience from './components/WorkExperience';
// import Bio from './components/Bio';
import Certifications from './components/Certifications';
import HomeContent from './components/HomeContent';
// import Footer from './components/Footer';
import "./components/css/homecontent.css";
import Article from './components/Article';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <div  style={{color:'#453c4a', backgroundColor: '#f5ebe6', minHeight: '100vh' }}>
      <Header />

      <Routes>
        <Route path="/works" element={<PortfolioItems />} />
        <Route path="/works/:articleId" element={<Article />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<HomeContent></HomeContent>} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/works/*" element={<Navigate to="/" />} />
      </Routes>
      </div>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
