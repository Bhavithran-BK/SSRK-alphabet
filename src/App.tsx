import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AlphabetGrid from './components/AlphabetGrid';
import PracticeWorkspace from './components/PracticeWorkspace';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/alphabet/:caseType" element={<AlphabetGrid />} />
          <Route path="/practice/:caseType/:letter" element={<PracticeWorkspace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
