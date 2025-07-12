import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { FiUsers, FiCalendar, FiRefreshCw, FiLogOut, FiPlus, FiLoader } from 'react-icons/fi';
import { BsGraphUp } from 'react-icons/bs';
import  API_BASE_URL  from '../../config/api';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        hrCount: 0,
        interviewCount: 0,
        pendingRequests: 0,
        completedInterviews: 0
    });
    const [hrList, setHrList] = useState([]);
    const [allInterviewRequests, setAllInterviewRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('hr');

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('adminToken');

            if (!token) {
                navigate('/admin/login');
                return;
            }

            const [hrCountRes, interviewCountRes, hrListRes, allRequestsRes] = await Promise.all([
                axios.get(`${API_BASE_URL}/api/admin/hr-count`, {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get(`${API_BASE_URL}/api/admin/interview-count`, {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get(`${API_BASE_URL}/api/admin/hrs`, {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get(`${API_BASE_URL}/api/interview-request/all`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);

            const allRequests = allRequestsRes.data.success ? allRequestsRes.data.data : [];

            setStats({
                hrCount: hrCountRes.data.success ? hrCountRes.data.count : 0,
                interviewCount: interviewCountRes.data.success ? interviewCountRes.data.count : 0,
                pendingRequests: allRequests.filter(req => req.status === 'pending').length,
                completedInterviews: allRequests.filter(req => req.status === 'completed').length
            });
            console.log(interviewCountRes.data);

            if (hrListRes.data.success) setHrList(hrListRes.data.hrs);
            setAllInterviewRequests(allRequests);

        } catch (error) {
            console.error('Error loading dashboard:', error);
            setError(error.response?.data?.message || 'Failed to load dashboard data');
            if (error.response?.status === 401) {
                localStorage.removeItem('adminToken');
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
        toast.success('Dashboard refreshed successfully!');
    };

    const StatCard = ({ icon, title, value, color }) => (
        <div className={`bg-white rounded-lg shadow p-6 flex items-center ${color} hover:shadow-md transition-shadow duration-200`}>
            <div className="p-3 rounded-full bg-opacity-20 bg-white mr-4">
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-2xl font-semibold text-gray-900">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header - Fixed z-index */}
            <header className="bg-white shadow z-10 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-2 my-3">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <div className="flex space-x-4">
                        <button
                            onClick={handleRefresh}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <FiRefreshCw className="mr-2" /> Refresh
                        </button>
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            <FiLogOut className="mr-2" /> Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 relative">
                {error && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <StatCard
                        icon={<FiUsers className="text-indigo-600 text-xl" />}
                        title="Total HRs"
                        value={stats.hrCount}
                        color="border-l-4 border-indigo-500"
                    />
                    <StatCard
                        icon={<FiCalendar className="text-blue-600 text-xl" />}
                        title="Total Interviews"
                        value={stats.interviewCount}
                        color="border-l-4 border-blue-500"
                    />
                    <StatCard
                        icon={<BsGraphUp className="text-yellow-600 text-xl" />}
                        title="Pending Requests"
                        value={stats.pendingRequests}
                        color="border-l-4 border-yellow-500"
                    />
                    <StatCard
                        icon={<FiCalendar className="text-green-600 text-xl" />}
                        title="Completed Interviews"
                        value={stats.completedInterviews}
                        color="border-l-4 border-green-500"
                    />
                </div>

                {/* Tabs */}
                <div className="mb-6 border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('hr')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'hr' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            HR Management
                        </button>
                        <button
                            onClick={() => setActiveTab('interviews')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'interviews' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            Interview Requests
                        </button>
                    </nav>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <FiLoader className="animate-spin h-12 w-12 text-indigo-600" />
                    </div>
                ) : (
                    <>
                        {/* HR Management Tab */}
                        {activeTab === 'hr' && (
                            <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
                                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                    <h3 className="text-lg font-medium text-gray-900">HR Professionals</h3>
                                    <button
                                        onClick={handleAddHR}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <FiPlus className="mr-2" /> Add HR
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Interviews</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {hrList.length > 0 ? (
                                                hrList.map((hr) => (
                                                    <tr key={hr._id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                                                    <span className="text-indigo-600 font-medium">{hr.name.charAt(0)}</span>
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">{hr.name}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hr.email}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {allInterviewRequests.filter(req => req.hrId?._id === hr._id).length}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                Active
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                                                        No HR professionals found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Interview Requests Tab */}
                        {activeTab === 'interviews' && (
                            <div className="bg-white shadow rounded-lg overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h3 className="text-lg font-medium text-gray-900">All Interview Requests</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HR</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {allInterviewRequests.length > 0 ? (
                                                allInterviewRequests.map((request) => (
                                                    <tr key={request._id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm font-medium text-gray-900">{request.userId?.name || 'N/A'}</div>
                                                            <div className="text-sm text-gray-500">{request.userId?.email || 'N/A'}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.position}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {new Date(request.date).toLocaleDateString()} at {request.time}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                                                request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                                    'bg-yellow-100 text-yellow-800'
                                                                }`}>
                                                                {request.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {request.hrId ? (request.hrId.name || request.hrId.email) : 'Unassigned'}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                                        No interview requests found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;