
import TopBar from './components/topbar/TopBar.jsx'
import Desk from './pages/desk/Desk.jsx'
import NoteShelf from './pages/noteshelf/NoteShelf.jsx'
import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from "react-router";

function App() {
  
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<Navigate to="/shelf" replace />} />
        <Route path="/shelf" element={<NoteShelf />} />
        <Route path="/shelf/:category" element={<NoteShelf />} />
        <Route path="/shelf/:category/:pageNo" element={<NoteShelf />} />
        <Route path="/desk" element={<Desk />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
