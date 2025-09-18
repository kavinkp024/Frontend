import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "./Login/LoginPage";
import HomePage from './HomePage/HomePage';
import RegisterForm from './Register/User';
import TaskForm from './HomePage/Task';
import TaskUpdate from './HomePage/TaskUpdate';
import VerticalNavbar from './HomePage/navbar';


function App() {

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<button>enter</button>} />
          <Route path="/user" element={<RegisterForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/task/list" element={<HomePage />} />
          <Route path="/task/create" element={<TaskForm />} />
          <Route path="/task/:id/edit" element={<TaskUpdate />} />
          <Route path="/task/navbar" element={<VerticalNavbar />} />

        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
