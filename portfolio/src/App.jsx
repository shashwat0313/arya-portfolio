import './App.css'
import Header from './components/Header';
import { BrowserRouter, Route, Routes, Redirect } from 'react-router-dom';
import PortfolioItems from './components/PortfolioItems';
import WorkExperience from './components/WorkExperience';
import Bio from './components/Bio';
import Certifications from './components/Certifications';
import HomeContent from './components/HomeContent';
// import Footer from './components/Footer';
import "./components/css/homecontent.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/works" element={<PortfolioItems />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/about" element={<Bio />} />
        <Route path="/contact" element={<WorkExperience />} />
        <Route path="/" element={<HomeContent></HomeContent>} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
