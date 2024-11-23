import './App.css'
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PortfolioItems from './components/PortfolioItems';
import WorkExperience from './components/WorkExperience';
import Bio from './components/Bio';
import Footer from './components/Footer';

function App() {
  return (
    <>hello</>
    // <Router>
    //   <Header />
    //   <Routes>
    //     <Route path="/works" element={<PortfolioItems />} />
    //     <Route path="/about" element={<Bio />} />
    //     <Route path="/contact" element={<WorkExperience />} />
    //     <Route path="/" element={<div>Welcome to Arya&apos;s Portfolio</div>} />
    //   </Routes>
    //   <Footer />
    // </Router>
  );
}

export default App;
