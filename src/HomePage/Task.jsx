import { useState } from 'react';

function TaskForm() {
    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');
    const [due_date, setdue_date] = useState('');
    const [status, setstatus] = useState('');
    const [priority, setpriority] = useState('');
    const [tagsInput, setTagsInput] = useState('');
    const [userId, setuserId] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const parsedTags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

        try {
            const response = await fetch('http://localhost:3001/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description, due_date, status, priority, tags: parsedTags, userId }),
            });
            const data = await response.json();
            if (data.success) {
                setMessage(data.message);
            } else {
                setMessage(data.message || 'Task failed.');
            }
        } catch (error) {
            console.error('Error during creating task:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="update-form">
            <h1 className="title">Task!</h1>
            <form onSubmit={handleSubmit}>
                <div className="from">
                    <input type="text"
                        value={title}
                        placeholder="Title"
                        className="update-text-1"
                        onChange={(event) => settitle(event.target.value)} />
                </div>
                <div className="from">
                    <input type="text"
                        value={description}
                        placeholder="Description"
                        className="update-text-1"
                        onChange={(event) => setdescription(event.target.value)} />
                </div>
                <div className="from">
                    <input
                        type="text"
                        placeholder="Due_Date"
                        className="update-text-1"
                        value={due_date}
                        onChange={(event) => setdue_date(event.target.value)} required />
                </div>
                <div className="from">
                    <input
                        type="text"
                        placeholder="Priority"
                        className="update-text-1"
                        value={priority}
                        onChange={(event) => setpriority(event.target.value)} required />
                </div>
                <div className="from">
                    <input
                        type="text"
                        placeholder="Status"
                        className="update-text-1"
                        value={status}
                        onChange={(event) => setstatus(event.target.value)} required />
                </div>
                <div className="from">
                    <input
                        type="text"
                        placeholder="Tags"
                        className="update-text-1"
                        value={tagsInput}
                        onChange={(event) => setTagsInput(event.target.value)} required />
                </div>
                <div className="from">
                    <input
                        type="text"
                        placeholder="UserId"
                        className="update-text-1"
                        value={userId}
                        onChange={(event) => setuserId(event.target.value)} required />
                </div>
                <button type="submit" className='button'>Submit</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
}

export default TaskForm;