import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const TaskUpdate = () => {
    const Id = useParams();
    const taskId = Id.id
    const [task, setTask] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '', due_date: '', priority: '', status: '', tags: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 
    

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await fetch(`http://localhost:3001/tasks/${taskId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const taskData = await response.json();
                setTask(taskData);
                setFormData({ title: taskData.title, description: taskData.description, due_date: taskData.due_date, priority: taskData.priority, status: taskData.status, tags: taskData.tags });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchTask();
    }, [taskId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedTask = await response.json();
            setTask(updatedTask);
            setEditing(false);
            navigate('/task/list');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading task profile...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!task) return <div>No task found.</div>;
    return (
        <div>
            {editing ? (
                <form className='update-form' onSubmit={handleSubmit}>
                    <h2 className='title'>Update Task!</h2>
                    <div>
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            className='update-text-1'
                            value={formData.title}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label>Description</label>
                        <input type="text"
                            name="description"
                            className='update-text-2'
                            value={formData.description}
                            onChange={handleChange} />
                    </div>
                    <div >
                        <label>Due-Date</label>
                        <input
                            type="text"
                            name="due_date"
                            className='update-text-3'
                            value={formData.due_date}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label>Priority</label>
                        <input
                            type="text"
                            name="Priority"
                            className='update-text-4'
                            value={formData.priority}
                            onChange={handleChange} />
                    </div>
                    <div >
                        <label>Status</label>
                        <input
                            type="text"
                            name="status"
                            className='update-text-5'
                            value={formData.status}
                            onChange={handleChange} />
                    </div>
                    <div >
                        <label>Tags:</label>
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
                    <p><strong>Title:</strong> {task.title}</p>
                    <p><strong>Description:</strong> {task.description}</p>
                    <p><strong>Due_date:</strong> {task.due_date}</p>
                    <p><strong>Status:</strong> {task.status}</p>
                    <p><strong>Priority:</strong> {task.priority}</p>
                    <p><strong>Tags:</strong> {task.tags}</p>
                    <button className='button-update' onClick={() => setEditing(true)}>Edit</button>
                </div>
            )}
        </div>
    );
}

export default TaskUpdate;