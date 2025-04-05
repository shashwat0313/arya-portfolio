import './App.css'
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PortfolioItems from './components/PortfolioItems';
import Certifications from './components/Certifications';
import HomeContent from './components/HomeContent';
import "./components/css/homecontent.css";
import Article from './components/Article';
import Contact from './components/Contact';
import Redirect404Handler from './Redirect404Handler';

function App() {

  return (
    <Router>

      <Redirect404Handler/>
  
      <div  style={{color:'#453c4a', backgroundColor: '#f5ebe6', minHeight: '100vh' }}>
      <Header />

      <Routes>
        <Route path="/works" element={<PortfolioItems />} />
        <Route path="/works/:articleId" element={<Article />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/arya-portfolio" element={<HomeContent></HomeContent>} />
        <Route path="*" element={<Navigate to="/arya-portfolio" />} />
        <Route path="/works/*" element={<Navigate to="/works" />} />
      </Routes>
      </div>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
