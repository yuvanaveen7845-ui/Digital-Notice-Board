import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();
    const { username, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            toast.success('Logged in successfully');
            navigate('/admin');
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.msg || 'Login Failed');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto' }}>
            <div className="card">
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin Login</h2>
                <form onSubmit={onSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={onChange}
                            placeholder="Enter username"
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            placeholder="Enter password"
                        />
                    </div>
                    <button type="submit" className="btn" style={{ width: '100%' }}>Login</button>
                </form>
                <p style={{ marginTop: '15px', textAlign: 'center' }}>
                    Don't have an account? <Link to="/register" style={{ color: '#007bff' }}>Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
