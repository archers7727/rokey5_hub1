import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MaterialPage from './pages/MaterialPage';
import ModePage from './pages/ModePage';
import ConfirmPage from './pages/ConfirmPage';
import MonitorPage from './pages/MonitorPage';
import CompletePage from './pages/CompletePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/material" element={<MaterialPage />} />
        <Route path="/mode" element={<ModePage />} />
        <Route path="/confirm" element={<ConfirmPage />} />
        <Route path="/monitor" element={<MonitorPage />} />
        <Route path="/complete" element={<CompletePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
