import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from './redux/slice/User.js';

import { Activity } from './pages/Activity';
import LoginPage from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { Submission } from './pages/Submission';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector(getIsLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element = {<ProtectedRoute> <Dashboard/> </ProtectedRoute>} />
        <Route path='/login' element = {<LoginPage/>} />
        <Route path='/activity' element = {<ProtectedRoute> <Activity/> </ProtectedRoute>}/>
        <Route path='/submission' element = {<ProtectedRoute> <Submission/> </ProtectedRoute>}/>
      </Routes>
    </>
  )
}

export default App
