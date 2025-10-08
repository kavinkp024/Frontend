import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import { FaLaptop, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SearchName, { SearchPriority, SearchStatus, SearchDescription, SearchDate } from '../Searchbar/SearchBar';
import Sidebar from './Sidebar';
import { CgUserRemove } from "react-icons/cg";
import './HomePage.css';
import { format } from 'date-fns';
import Profile from './navbar';

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [searchStatus, setSearchStatus] = useState('');
  const [searchPriority, setSearchPriority] = useState('');
  const [searchduedate, setSearchDueDate] = useState('');
  const [searchDescription, setSearchDescription] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotalPages] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;
  const [username, setUserName] = useState('');
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/tasks?page=${currentPage}&limit=${itemsPerPage}&query=${username}&status=${searchStatus}&priority=${searchPriority}&data=${searchDescription}&due_date=${searchduedate}`
      );
      const data = await response.json();
      setTasks(data.data);
      setTotalPages(Math.ceil(data.total / itemsPerPage));
    } catch (error) {
      console.error('Error fetching taska:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    async function fetchtast() {
      await fetchData();
    }
    fetchtast();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleUserNameSearch = (name) => {
    setUserName(name);
  };

  const handleSearchStatus = (term) => {
    setSearchStatus(term);
  };

  const handleSearchPriority = (term) => {
    setSearchPriority(term);
  };

  const handleSearchDescription = (term) => {
    setSearchDescription(term);
  };

  const handleSearchDate = (term) => {
    setSearchDueDate(term);
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
      <main className="homepage">
        <div className='title-top'>
          <button className="button-home"><Sidebar /></button>
          <div className='fc-name'>
            <FaLaptop size={40} />
            INNOVIEW
            software development team.
          </div>
          <button className="profile"><Profile /></button>
        </div>
        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <>
            <div>
              <table className='table'>
                <thead>
                  <tr>
                    <td></td>
                    <td>
                      <SearchName setValue={handleUserNameSearch} value={username} fetchname={fetchData} />
                    </td>
                    <td colSpan="2">
                      <SearchDescription onSearch={handleSearchDescription} title={searchDescription} fetchtitle={fetchData} />
                    </td>
                    <td>
                      <SearchDate onSearch={handleSearchDate} due_date={searchduedate} fetchDate={fetchData} />
                    </td>
                    <td>
                      <SearchPriority onSearch={handleSearchPriority} priority={searchPriority} fetchpriority={fetchData} />
                    </td>
                    <td>
                      <SearchStatus onSearch={handleSearchStatus} fetchstatus={fetchData} status={searchStatus} />
                    </td>
                  </tr>
                  <tr>
                    <th>S.NO</th>
                    <th>UserName</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Due_Date</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Tags</th>
                    <th>UserId</th>
                    <th className='action'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(tasks) && tasks.map(task => (
                    <tr key={task.id} className='key'>
                      <td>{task.id}</td>
                      <td>{task.user.name}</td>
                      <td>{task.title}</td>
                      <td>{task.description || 'null'}</td>
                      <td>{format(new Date(task.due_date), 'MM/dd/yyyy,HH:mm a')}</td>
                      <td>{task.priority}</td>
                      <td>{task.status}</td>
                      <td>
                        {Array.isArray(task.tags) && task.tags.map((tag, index) => (
                          <span key={index} className="tag-pill">
                            {tag}
                          </span>
                        ))}
                      </td>
                      <td>{task.user.id}</td>
                      <td>
                        <nav>
                          <Link to={`/tasks/${task.id}/edit`}>
                            <button className='update'><FaEdit size={25} /></button>
                          </Link>
                          <button className='delete' onClick={() => handleDeleteTask(task.id)}><CgUserRemove size={25} /></button>
                        </nav>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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


