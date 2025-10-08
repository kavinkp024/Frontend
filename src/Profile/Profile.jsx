import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null);
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:3001/users/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const userData = await response.json();
                setUser(userData);
                setFormData({ name: userData.name, email: userData.email, password: userData.password, phone: userData.phone });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [userId, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleProfile = (e) => {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:3001/users/${userId}`, {
                method: 'PATCH',
                headers: {
                   'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const updatedUser = await response.json();
            setUser(updatedUser);
            navigate('/dashboard');
            setEditing(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading User profile...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>No user found.</div>;
    return (
        <div>
            {editing ? (
                <form className='update-Profile' onSubmit={handleSubmit}>
                    <h2 className='title-profile'>Update User!</h2>
                    <input
                        type="file"
                        onChange={handleProfile} />
                    {file && <img src={file} alt="Uploaded preview" />}
                    <label style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT' }}>Name</label>
                    <input
                        type="text"
                        name="name"
                        className='update-input-1'
                        value={formData.name}
                        onChange={handleChange} />
                    <label style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT' }}>Email</label>
                    <input type="text"
                        name="email"
                        className='update-input-2'
                        value={formData.email}
                        onChange={handleChange} />
                    <label style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT' }}>Password</label>
                    <input
                        type="text"
                        name="Password"
                         placeholder="New Password"
                        className='update-input-3'
                        onChange={handleChange} />
                    <label style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT' }}>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        className='update-input-4'
                        value={formData.phone}
                        onChange={handleChange} />
                    <div className='profile-button'>
                        <button className='button-click' type="submit">Save</button>
                        <button className='button-click' type="button" onClick={() => setEditing(false)}>Cancel</button>
                    </div>
                </form>
            ) : (
                <div className='profile-edit'>
                    <p><strong style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT' }}>Name:</strong> {user.name}</p>
                    <p><strong style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT' }}>Email:</strong> {user.email}</p>
                    <button className='button-onclick' onClick={() => setEditing(true)}>Edit</button>
                </div>
            )}
        </div>
    );
}

