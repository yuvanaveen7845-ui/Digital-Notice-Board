import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();
    const { username, password, confirmPassword } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                username,
                password
            });
            // Optional: Login immediately after register
            // localStorage.setItem('token', res.data.token);
            toast.success('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.msg || 'Registration Failed');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto' }}>
            <div className="card">
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin Registration</h2>
                <form onSubmit={onSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={onChange}
                            placeholder="Enter username"
                            required
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
                            minLength="6"
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={onChange}
                            placeholder="Confirm password"
                            minLength="6"
                            required
                        />
                    </div>
                    <button type="submit" className="btn" style={{ width: '100%' }}>Register</button>
                </form>
                <p style={{ marginTop: '15px', textAlign: 'center' }}>
                    Already have an account? <Link to="/login" style={{ color: '#007bff' }}>Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
