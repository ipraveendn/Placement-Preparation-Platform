import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InterviewCountCard from '../../Components/InterviewCountCard';
import HRCountCard from '../../Components/HrCount';
import HRListTable from '../../Components/HRListTable';
import { toast } from 'sonner';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [hrCount, setHrCount] = useState(0);
    const [interviewCount, setInterviewCount] = useState(0);
    const [hrList, setHrList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('adminToken');

            if (!token) {
                navigate('/admin/login');
                return;
            }

            const [hrCountRes, interviewCountRes, hrListRes] = await Promise.all([
                axios.get('http://localhost:5000/api/admin/hr-count', {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get('http://localhost:5000/api/admin/interview-count', {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get('http://localhost:5000/api/admin/hrs', {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);

            if (hrCountRes.data.success) {
                setHrCount(hrCountRes.data.count);
            }
            if (interviewCountRes.data.success) {
                setInterviewCount(interviewCountRes.data.count);
            }
            if (hrListRes.data.success) {
                setHrList(hrListRes.data.hrs);
            }
        } catch (error) {
            console.error('Error loading dashboard:', error);
            setError(error.response?.data?.message || 'Failed to load dashboard data');
            if (error.response?.status === 401) {
                navigate('/admin/login');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [navigate]);

    const handleAddHR = () => navigate('/add-hr');

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    const handleRefresh = () => {
        fetchData();
        toast.success('Dashboard data refreshed!');
    };

    return (
        <div className="p-6 min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

            {error && (
                <div className="max-w-4xl mx-auto mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
                <HRCountCard count={hrCount} />
                <InterviewCountCard count={interviewCount} />
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <HRListTable hrList={hrList} />
            )}

            <div className="flex justify-center gap-4 mt-10">
                <button
                    onClick={handleAddHR}
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Add HR
                </button>
                <button
                    onClick={handleRefresh}
                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                >
                    Refresh Data
                </button>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;