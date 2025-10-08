import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "./Login/LoginPage";
import TablePage from './HomePage/Table';
import RegisterForm from './User/User';
import TaskForm from './Task/Task';
import TaskUpdate from './Task/TaskUpdate';
import Profile from './Profile/Profile';
import Layout from './Layout/Layout';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import HomePage from './HomePage/HomePage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user" element={<RegisterForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="dashboard" element={<HomePage />} />
            <Route path="task/list" element={<TablePage />} />
            <Route path="task/create" element={<TaskForm />} />
            <Route path="task/:id/edit" element={<TaskUpdate />} />
            <Route path="user/profile/edit" element={<Profile />} />
          </Route>
        </Route>
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;