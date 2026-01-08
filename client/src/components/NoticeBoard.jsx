import { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

const NoticeBoard = () => {
    const [notices, setNotices] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Connect to Socket.io
        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);

        // Initial Fetch
        const fetchNotices = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/notices');
                setNotices(res.data);
            } catch (err) {
                console.error(err);
                toast.error('Failed to load notices');
            }
        };

        fetchNotices();

        // Cleanup
        return () => newSocket.close();
    }, []);

    useEffect(() => {
        if (!socket) return;

        // Listen for new notices
        socket.on('newNotice', (notice) => {
            setNotices((prev) => [notice, ...prev]);
            toast.info('New Announcement: ' + notice.title);
        });

        return () => {
            socket.off('newNotice');
        };
    }, [socket]);

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#ffcc00' }}>📢 Digital Notice Board</h1>
            <div className="notices-grid">
                {notices.map((notice) => (
                    <div key={notice._id} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <h2 style={{ margin: 0, color: '#e74c3c' }}>{notice.title}</h2>
                            <small style={{ color: '#95a5a6' }}>{new Date(notice.date).toLocaleString()}</small>
                        </div>
                        <p style={{ fontSize: '1.1em', lineHeight: '1.6' }}>{notice.content}</p>
                    </div>
                ))}

                {notices.length === 0 && (
                    <div style={{ textAlign: 'center', color: '#7f8c8d' }}>
                        <h3>No notices yet...</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NoticeBoard;
