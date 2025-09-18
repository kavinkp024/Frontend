import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const TasksTable = ({ tasks, DeleteTask, onEditClick }) => {

    return (
        <div>
            <table className='table-style'>
                <thead>
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody >
                    {Array.isArray(tasks) && tasks.map(task => (
                        <tr key={task.id} className='key'>
                            <td>{task.id}</td>
                            <td>{task.user.name}</td>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.due_date}</td>
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
                                    <Link to={`/task/${task.id}/edit`}>
                                    <button className='update'><FaEdit size={20}/></button>
                                    </Link>
                                    <button className='delete' onClick={() => DeleteTask(task.id)}><FaTrashAlt size={20} /></button>
                                </nav>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TasksTable;

