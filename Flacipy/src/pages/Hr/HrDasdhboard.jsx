import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HrDashboard = () => {
    const [interviewCount, setInterviewCount] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('hrToken');

        if (!token) {
            navigate('/hr-login');
            return;
        }

        const fetchInterviewCount = async () => {
            try {
                const res = await axios.get('/admin/interview-count', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setInterviewCount(res.data.count);
            } catch (error) {
                console.error('Error fetching interview count:', error);
                if (error.response?.status === 401) {
                    navigate('/hr-login');
                }
            }
        };

        fetchInterviewCount();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('hrToken');
        navigate('/hr-login');
    };

    return (
        <div className="p-6 min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">HR Dashboard</h1>

            <div className="max-w-md mx-auto">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-2 text-gray-700">Interviews Scheduled</h2>
                    <p className="text-4xl font-bold text-indigo-600">
                        {interviewCount !== null ? interviewCount : '--'}
                    </p>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition duration-200"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default HrDashboard;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const HrDashboard = () => {
//     const [interviewCount, setInterviewCount] = useState(null);

//     useEffect(() => {
//         const fetchInterviewCount = async () => {
//             try {
//                 const res = await axios.get('/api/admin/interview-count'); // reuse same endpoint
//                 setInterviewCount(res.data.count);
//             } catch (error) {
//                 console.error('Error fetching interview count:', error);
//             }
//         };

//         fetchInterviewCount();
//     }, []);

//     return (
//         <div className="dashboard">
//             <h2>HR Dashboard</h2>
//             <div className="stats">
//                 <div className="card">
//                     <h3>Interviews Scheduled</h3>
//                     <p>{interviewCount !== null ? interviewCount : '--'}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HrDashboard;
