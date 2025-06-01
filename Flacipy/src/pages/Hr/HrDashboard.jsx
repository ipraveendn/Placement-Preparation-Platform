import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const HrDashboard = () => {
    const navigate = useNavigate();
    const [interviews, setInterviews] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedInterview, setSelectedInterview] = useState(null);
    const [scores, setScores] = useState({
        technical: '',
        communication: '',
        problemSolving: ''
    });
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        fetchUpcomingInterviews();
        fetchPendingRequests();
    }, []);

    const fetchUpcomingInterviews = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('hrToken');

            if (!token) {
                toast.error('Please login to access the dashboard');
                navigate('/hr/login');
                return;
            }

            const response = await axios.get('http://localhost:5000/api/interview-request/upcoming', {
                headers: {
                    'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                setInterviews(response.data.data);
            } else {
                setError(response.data.message || 'Failed to fetch upcoming interviews');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch upcoming interviews';
            setError(errorMessage);
            toast.error(errorMessage);

            if (error.response?.status === 401) {
                localStorage.removeItem('hrToken');
                navigate('/hr/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchPendingRequests = async () => {
        try {
            setError(null);
            const token = localStorage.getItem('hrToken');

            if (!token) return;

            const response = await axios.get('http://localhost:5000/api/interview-request/pending', {
                headers: {
                    'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                setPendingRequests(response.data.data);
            } else {
                setError(response.data.message || 'Failed to fetch pending requests');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch pending requests';
            setError(errorMessage);
            toast.error(errorMessage);

            if (error.response?.status === 401) {
                localStorage.removeItem('hrToken');
                navigate('/hr/login');
            }
        }
    };

    const handleScoreSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('hrToken');
            if (!token) {
                toast.error('Please login to submit scores');
                navigate('/hr/login');
                return;
            }

            const response = await axios.post(
                `http://localhost:5000/api/mock-interview/submit-scores/${selectedInterview._id}`,
                { scores, feedback },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );

            if (response.data.success) {
                toast.success('Scores submitted successfully');
                setSelectedInterview(null);
                setScores({ technical: '', communication: '', problemSolving: '' });
                setFeedback('');
                fetchUpcomingInterviews();
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to submit scores';
            toast.error(errorMessage);
            if (error.response?.status === 401) {
                localStorage.removeItem('hrToken');
                navigate('/hr/login');
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('hrToken');
        navigate('/hr/login');
    };

    const handleAcceptRequest = async (requestId) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('hrToken');
            if (!token) {
                toast.error('Please login to perform this action.');
                navigate('/hr/login');
                return;
            }

            const response = await axios.post(
                'http://localhost:5000/api/interview-request/accept',
                { requestId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                toast.success('Request accepted successfully!');
                fetchPendingRequests();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to accept request');
            if (error.response?.status === 401) {
                localStorage.removeItem('hrToken');
                navigate('/hr/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRejectRequest = async (requestId) => {
        const reason = prompt("Please provide a reason for rejection (optional):");

        try {
            setLoading(true);
            const token = localStorage.getItem('hrToken');
            if (!token) {
                toast.error('Please login to perform this action.');
                navigate('/hr/login');
                return;
            }

            const response = await axios.post(
                'http://localhost:5000/api/interview-request/reject',
                { requestId, reason },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                toast.success('Request rejected successfully!');
                fetchPendingRequests();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to reject request');
            if (error.response?.status === 401) {
                localStorage.removeItem('hrToken');
                navigate('/hr/login');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">HR Dashboard</h1>
                        <p className="text-gray-600">Manage interviews and candidate evaluations</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition-colors"
                    >
                        Logout
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                        <p>{error}</p>
                    </div>
                )}

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Upcoming Interviews Card */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="bg-blue-600 p-4">
                                <h2 className="text-xl font-semibold text-white">Upcoming Interviews</h2>
                            </div>
                            <div className="p-4">
                                {interviews.length === 0 ? (
                                    <p className="text-gray-500 text-center py-4">No upcoming interviews scheduled.</p>
                                ) : (
                                    <ul className="divide-y divide-gray-200">
                                        {interviews.map(interview => (
                                            <li key={interview._id} className="py-4">
                                                <div className="flex flex-col sm:flex-row justify-between gap-3">
                                                    <div>
                                                        <p className="font-medium text-gray-900">{interview.userId?.name}</p>
                                                        <p className="text-sm text-gray-600">Position: {interview.position}</p>
                                                        <p className="text-sm text-gray-600">
                                                            {new Date(interview.date).toLocaleDateString()} at {interview.time}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => setSelectedInterview(interview)}
                                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap self-end sm:self-center transition-colors"
                                                    >
                                                        Submit Feedback
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Pending Requests Card */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="bg-indigo-600 p-4">
                                <h2 className="text-xl font-semibold text-white">Pending Interview Requests</h2>
                            </div>
                            <div className="p-4">
                                {pendingRequests.length === 0 ? (
                                    <p className="text-gray-500 text-center py-4">No pending interview requests.</p>
                                ) : (
                                    <ul className="divide-y divide-gray-200">
                                        {pendingRequests.map(request => (
                                            <li key={request._id} className="py-4">
                                                <div className="flex flex-col sm:flex-row justify-between gap-3">
                                                    <div>
                                                        <p className="font-medium text-gray-900">{request.userId?.name}</p>
                                                        <p className="text-sm text-gray-600">Position: {request.position}</p>
                                                        <p className="text-sm text-gray-600">
                                                            {new Date(request.date).toLocaleDateString()} at {request.time}
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-2 self-end sm:self-center">
                                                        <button
                                                            onClick={() => handleAcceptRequest(request._id)}
                                                            disabled={loading}
                                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm transition-colors disabled:opacity-50"
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            onClick={() => handleRejectRequest(request._id)}
                                                            disabled={loading}
                                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition-colors disabled:opacity-50"
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Feedback Modal */}
                {selectedInterview && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
                            <div className="bg-blue-600 p-4 rounded-t-xl">
                                <h3 className="text-xl font-semibold text-white">
                                    Feedback for {selectedInterview.userId?.name}
                                </h3>
                            </div>
                            <form onSubmit={handleScoreSubmit} className="p-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Technical Score (0-100)</label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={scores.technical}
                                            onChange={(e) => setScores({ ...scores, technical: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Communication Score (0-100)</label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={scores.communication}
                                            onChange={(e) => setScores({ ...scores, communication: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Problem Solving Score (0-100)</label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={scores.problemSolving}
                                            onChange={(e) => setScores({ ...scores, problemSolving: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
                                        <textarea
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            rows="4"
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedInterview(null)}
                                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HrDashboard;