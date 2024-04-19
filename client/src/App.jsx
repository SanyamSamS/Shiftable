import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from '../src/components/landingpage/landingpage';
import EmployeeDashboard from '../src/components/dashboard/employeeDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<EmployeeDashboard />} />
        <Route path="/" element={<LandingPage/>} />
      </Routes>
    </Router>
  );
}

export default App;