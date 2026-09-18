import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from "./pages/HomePage";
import { ClientDetailPage } from "./pages/ClientDetailPage";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/pengajuan/:clientID" element={<ClientDetailPage />}/>
      </Routes>
    </Router>
  )
}