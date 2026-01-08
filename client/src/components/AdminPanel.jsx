import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });

    const navigate = useNavigate();
    const { title, content } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content) {
            toast.warning('Please fill in all fields');
            return;
        }

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        };

        try {
            await axios.post('http://localhost:5000/api/notices', formData, config);
            toast.success('Notice Posted Successfully!');
            setFormData({ title: '', content: '' });
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 401) {
                toast.error('Session expired. Please login again.');
                handleLogout(); // Auto logout on 401
            } else {
                toast.error('Failed to post notice');
            }
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Admin Panel</h1>
                <button onClick={handleLogout} className="btn" style={{ background: '#dc3545' }}>Logout</button>
            </div>
            <div className="card">
                <h3>Post New Announcement</h3>
                <form onSubmit={onSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={onChange}
                            placeholder="Enter notice title..."
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Content</label>
                        <textarea
                            name="content"
                            value={content}
                            onChange={onChange}
                            rows="5"
                            placeholder="Enter notice details..."
                        ></textarea>
                    </div>
                    <button type="submit" className="btn" style={{ width: '100%' }}>Post Notice</button>
                </form>
            </div>
        </div>
    );
};

export default AdminPanel;
