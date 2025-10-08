import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Task.css';

export default function TaskUpdate() {
    const Id = useParams();
    const taskId = Id.id
    const [task, setTask] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '', due_date: '', priority: '', status: '', tags: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('authToken');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const taskData = await response.json();
                setTask(taskData);
                setFormData({
                    title: taskData.title,
                    description: taskData.description,
                    due_date: taskData.due_date,
                    Priority: taskData.priority,
                    status: taskData.status,
                    tags: Array.isArray(taskData.tags) ? taskData.tags.join(', ') : taskData.tags || ''
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchTask();
    }, [taskId, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const parsedTags = typeof formData.tags === 'string'
            ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
            : formData.tags;
        setLoading(true);
        setError(null);
        try {
            const updatedFormData = { ...formData, tags: parsedTags }; 
            const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFormData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message ||`HTTP error! status: ${response.status}`);
            }
            const updatedTask = await response.json();
            setTask(updatedTask);
            navigate('/task/list');
            setEditing(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading task...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!task) return <div>No task found.</div>;
    return (
        <div>
            {editing ? (
                <form className='update-task' onSubmit={handleSubmit}>
                    <h2 className='update-title'>Update Task!</h2>
                    <div>
                        <label style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT' }}>Title</label>
                        <input
                            type="text"
                            name="title"
                            className='update-text-1'
                            value={formData.title}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT' }}>Description</label>
                        <input type="text"
                            name="description"
                            className='update-text-2'
                            value={formData.description}
                            onChange={handleChange} />
                    </div>
                    <div >
                        <label style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT' }}>Due_Date</label>
                        <input
                            type="text"
                            name="due_date"
                            className='update-text-3'
                            value={formData.due_date}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT' }}>Priority</label>
                        <input
                            type="text"
                            name="Priority"
                            className='update-text-4'
                            value={formData.Priority}
                            onChange={handleChange} />
                    </div>
                    <div >
                        <label style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT' }}>Status</label>
                        <input
                            type="text"
                            name="status"
                            className='update-text-5'
                            value={formData.status}
                            onChange={handleChange} />
                    </div>
                    <div >
                        <label style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT' }}>Tags</label>
                        <input
                            type="text"
                            name="tags"
                            className='update-text-6'
                            value={formData.tags}
                            onChange={handleChange} />
                    </div>
                    <div className='task-button'>
                        <button className='button-update' type="submit">Save</button>
                        <button className='button-update' type="button" onClick={() => setEditing(false)}>Cancel</button>
                    </div>
                </form>
            ) : (
                <div className='task-edit'>
                    <p><strong style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT' }}>Title:</strong> {task.title}</p>
                    <p><strong style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT' }}>Description:</strong> {task.description}</p>
                    <p><strong style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT' }}>Due_date:</strong> {task.due_date}</p>
                    <p><strong style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT' }}>Status:</strong> {task.status}</p>
                    <p><strong style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT' }}>Priority:</strong> {task.priority}</p>
                    <p><strong style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT' }}>Tags:</strong> {task.tags}</p>
                    <button className='button-edit' onClick={() => setEditing(true)}>Edit</button>
                </div>
            )}
        </div>
    );
}

