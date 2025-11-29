import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import FeedbackPage from './pages/FeedbackPage';
import SuggestionsPage from './pages/SuggestionsPage';
import ConfirmationPage from './pages/ConfirmationPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route redirects to feedback page */}
        <Route path="/" element={<Navigate to="/feedback" replace />} />
        
        {/* Main application routes */}
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/therapists/suggestions" element={<SuggestionsPage />} />
        <Route path="/switch/confirmation" element={<ConfirmationPage />} />
        
        {/* Catch-all route - redirect to feedback */}
        <Route path="*" element={<Navigate to="/feedback" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
