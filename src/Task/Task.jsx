import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Task.css';


function TaskForm() {
    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');
    const [due_date, setdue_date] = useState('');
    const [status, setstatus] = useState('');
    const [priority, setpriority] = useState('');
    const [tagsInput, setTagsInput] = useState('');
    const [userId, setuserId] = useState('');
    const [message, setMessage] = useState('');
    const [titleError, settitleerror] = useState('');
    const [due_dateError, setdue_dateerror] = useState('');
    const [priorityError, setpriorityerror] = useState(''); 
    const [statusError, setstatuserror] = useState('');
    const [tagsError, settagserror] = useState('');
    const [useridError, setuseriderror] = useState('');
    const navigate = useNavigate(); 
    

    const handleSubmit = async (event) => {
        event.preventDefault();

        const parsedTags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

        const validateForm = () => {
            let isValid = true;

            if (!title.trim()) {
                settitleerror('Title is required.');
                isValid = false;
            } else {
                settitleerror('');
            }

            if (!due_date.trim()) {
                setdue_dateerror('Due_Date is required.');
                isValid = false;
            } else {
                setdue_dateerror('');
            }

            if (!priority.trim()) {
                setpriorityerror('Priority is required.');
                isValid = false;
            } else {
                setpriorityerror('');
            }

            if (!status.trim()) {
                setstatuserror('Status is required.');
                isValid = false;
            } else {
                setstatuserror('');
            }

            if (!tagsInput.trim()) {
                settagserror('Tags is required.');
                isValid = false;
            } else {
                settagserror('');
            }

            if (!userId.trim()) {
                setuseriderror('UserId is required.');
                isValid = false;
            } else {
                setuseriderror('');
            }
            return isValid;
        };

        if (validateForm()) {
            try {
                const response = await fetch(`http://localhost:3001/tasks`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title, description, due_date, status, priority, tags: parsedTags, userId }),
                });
                const data = await response.json();
                if (data.success) {
                    setMessage(data.message);
                    navigate('/task/list');
                } if (data.message) {
                    setMessage(data.message)
                }
                else {
                    setMessage('Task failed.');
                }
            } catch (error) {
                console.error('Error during creating task:', error);
                setMessage('An error occurred. Please try again.');
            }
        }
        else {
            console.log('Form has errors.');
        }
    };

    return (
        <div className="task-form">
            <h1 className="title">Task!</h1>
            <form onSubmit={handleSubmit}>
                <label style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT' }}>Title<span style={{ color: 'red'}}>*</span></label>
                <input type="text"
                    value={title}
                    className='input-task'
                    placeholder="Enter your title"
                    onChange={(event) => settitle(event.target.value)} />
                {titleError && <p style={{ color: 'red' }}>{titleError}</p>}
                <label style={{ fontSize: '21px', color: 'blue',fontFamily: 'Brush Script MT' }}>Description</label>
                <input type="text"
                    value={description}
                    className='input-task'
                    placeholder="Enter your description"
                    onChange={(event) => setdescription(event.target.value)} />
                <label style={{ fontSize: '21px', color: 'blue',fontFamily: 'Brush Script MT'}}>Due_Date<span style={{ color: 'red'}}>*</span></label>
                <input
                    type="text"
                    placeholder="Enter your due_date"
                    className='input-task'
                    value={due_date}
                    onChange={(event) => setdue_date(event.target.value)} />
                {due_dateError && <p style={{ color: 'red' }}>{due_dateError}</p>}
                <label style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT' }}>Priority<span style={{ color: 'red'}}>*</span></label>
                <input
                    type="text"
                    placeholder="Enter your priority"
                    value={priority}
                    className='input-task'
                    onChange={(event) => setpriority(event.target.value)} />
                {priorityError && <p style={{ color: 'red' }}>{priorityError}</p>}
                <label style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT' }}>Status<span style={{ color: 'red'}}>*</span></label>
                <input
                    type="text"
                    placeholder="Enter your status"
                    value={status}
                    className='input-task'
                    onChange={(event) => setstatus(event.target.value)} />
                {statusError && <p style={{ color: 'red' }}>{statusError}</p>}
                <span>
                    <label style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT',}}>Tags<span style={{ color: 'red'}}>*</span></label>
                    <input
                        type="text"
                        placeholder="Enter your tags"
                        value={tagsInput}
                        className='input-task'
                        onChange={(event) => setTagsInput(event.target.value)} />
                    {tagsError && <p style={{ color: 'red' }}>{tagsError}</p>}
                </span>
                <label style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT' }}>UserId<span style={{ color: 'red'}}>*</span></label>
                <input
                    type="text"
                    placeholder="Enter your UserId"
                    value={userId}
                    className='input-task'
                    onChange={(event) => setuserId(event.target.value)} />
                {useridError && <p style={{ color: 'red' }}>{useridError}</p>}
                <div className='task-submit'>
                    <button type="submit" className='button-task'>Submit</button>
                    {message && <p>{message}</p>}
                </div>
            </form>
        </div>
    );
}

export default TaskForm;