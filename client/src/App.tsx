import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { HeroList } from './components/HeroList/HeroList';
import { HeroInfo } from './components/HeroInfo/HeroInfo';
import { CreateHero } from './components/CreateHero/CreateHero';
import './App.css';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HeroList />} />
        <Route path="/createhero" element={<CreateHero />} />
        <Route path="superhero/:id" element={<HeroInfo />} />
        <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
    </Router>
    </>
  );
}

export default App;
