import { HashRouter, Routes, Route } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import BackgroundTexture from './components/BackgroundTexture';
import HomePage from './pages/HomePage';
import WorkPage from './pages/WorkPage';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ROOT APP — with HashRouter for GitHub Pages
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function App() {
  return (
    <HashRouter>
      <div className="bg-bg-base text-text-secondary min-h-screen relative">
        <BackgroundTexture />
        <CustomCursor />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
