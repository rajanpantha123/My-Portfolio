import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import BackgroundTexture from './components/BackgroundTexture';
import HomePage from './pages/HomePage';
import WorkPage from './pages/WorkPage';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ROOT APP — with react-router

   Routes:
     /      → HomePage  (Hero, About, Skills, Projects preview, Contact)
     /work  → WorkPage  (full filterable project grid)

   (c) ACCENT COLOR: Change the --accent-* CSS vars in
   index.css to adjust the signature glow color.
   Currently set to hot orange #FF5C1A.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-bg-base text-text-secondary min-h-screen relative">
        <BackgroundTexture />
        <CustomCursor />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
