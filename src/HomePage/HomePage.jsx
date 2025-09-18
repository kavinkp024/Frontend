import React, { useState, useEffect } from 'react';
import TasksTable from './Table';
import Pagination from './Pagination';
import SearchBar from '../Searchbar/SearchBar';
import { FaHome ,FaLaptop, FaUserCircle, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import './HomePage.css';

export default function  HomePage() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotalPages] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isShowingSidebar, setIsShowingSidebar] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true); 
      try {
        const response = await fetch(
          `http://localhost:3001/tasks/?query=${searchTerm}&page=${currentPage}&limit=${itemsPerPage}`
        );
        const data = await response.json();
        console.log(response)
        setTasks(data.data);
        setTotalPages(Math.ceil(data.total / itemsPerPage));
      } catch (error) {
        console.error('Error fetching taska:', error);
      } finally {
        setLoading(false);
      }

    };

    fetchTasks();
  }, [currentPage, searchTerm, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      setError(error);
    }
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }



  return (
    <>
      {isShowingSidebar && (
        <Sidebar />
      )}
      <main className="homepage">
        <div className='title-top'>
          <button className ="button-home" onClick={() => setIsShowingSidebar(!isShowingSidebar)}><FaHome size={20} /></button>
          <div className='fc-name'>
            <FaLaptop size={40} />
            INNOVIEW
            software development team.
          </div>
          <nav>
            <Link to="/createtask">
              <ul><FaUserPlus size={30} color='black' /></ul>
            </Link>
          </nav>
          <ul className='profile'>
            <FaUserCircle size={30} />
          </ul>
        </div>
        <SearchBar onSearch={handleSearch} />
        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <>
            <TasksTable
              tasks={tasks}
              DeleteTask={handleDeleteTask}
            />
            <Pagination
              total={total}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>
    </>
  );
};


