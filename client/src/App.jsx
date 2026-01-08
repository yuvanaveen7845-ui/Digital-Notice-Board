import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NoticeBoard from './components/NoticeBoard';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="container">
        <nav style={{ marginBottom: '20px', padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '5px' }}>
          <Link to="/" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Notice Board</Link>
          <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>Admin Panel</Link>
        </nav>

        <Routes>
          <Route path="/" element={<NoticeBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>

        <ToastContainer position="bottom-right" theme="dark" />
      </div>
    </Router>
  );
}

export default App;
