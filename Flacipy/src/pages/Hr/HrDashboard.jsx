import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import API_BASE_URL  from '../../config/api';

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

            // Fetch from mockinterviews endpoint for HR
            const response = await axios.get(`${API_BASE_URL}/api/mock-interview/hr-interviews`, {
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
            
            if (!token) {
                // Navigation already handled in fetchUpcomingInterviews
                return;
            }

            const response = await axios.get(`${API_BASE_URL}/api/interview-request/pending`, {
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
            console.error('Error fetching pending requests:', error); // Debug log
            const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch pending requests';
            setError(errorMessage);
            toast.error(errorMessage);
            
            if (error.response?.status === 401) {
                localStorage.removeItem('hrToken');
                navigate('/hr/login');
            }
        } finally {
            setLoading(false); // Set loading to false after both fetches are complete
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

            // Convert scores to numbers
            const numericScores = {
                technical: Number(scores.technical),
                communication: Number(scores.communication),
                problemSolving: Number(scores.problemSolving)
            };

            const response = await axios.post(
                `${API_BASE_URL}/api/mock-interview/submit-scores/${selectedInterview._id}`,
                {
                    scores: numericScores,
                    feedback
                },
                {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
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
                `${API_BASE_URL}/api/interview-request/accept`,
                { requestId },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (response.data.success) {
                toast.success('Request accepted successfully!');
                fetchPendingRequests(); // Refresh the list
            } else {
                toast.error(response.data.message || 'Failed to accept request');
            }
        } catch (error) {
            console.error('Error accepting request:', error);
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
        // You might want to add a modal here to ask for a rejection reason
        const reason = prompt("Please provide a reason for rejection (optional):"); // Simple prompt for now

        if (reason === null) {
            // User cancelled the prompt
            toast.info('Rejection cancelled');
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem('hrToken');
            if (!token) {
                toast.error('Please login to perform this action.');
                navigate('/hr/login');
                return;
            }

            console.log('Sending reject request with:', { requestId, reason }); // Debug log

            const response = await axios.post(
                `${API_BASE_URL}/api/interview-request/reject`,
                { requestId, reason },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Reject response:', response.data); // Debug log

            if (response.data.success) {
                toast.success(response.data.message || 'Request rejected successfully!');
                // Refresh both lists to ensure UI is up to date
                try {
                await Promise.all([
                    fetchPendingRequests(),
                    fetchUpcomingInterviews()
                ]);
                    console.log('Lists refreshed successfully after rejection');
                } catch (refreshError) {
                    console.error('Error refreshing lists after rejection:', refreshError);
                    toast.error('Request rejected but failed to refresh the list');
                }
            } else {
                console.error('Reject request failed:', response.data);
                toast.error(response.data.message || 'Failed to reject request');
            }
        } catch (error) {
            console.error('Error rejecting request:', error);
            console.error('Error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                headers: error.response?.headers
            });

            // Show the specific error message from the backend if available
            const errorMessage = error.response?.data?.message || 'Failed to reject request';
            toast.error(errorMessage);

            if (error.response?.status === 401) {
                localStorage.removeItem('hrToken');
                navigate('/hr/login');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">HR Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Upcoming Interviews */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-2xl font-semibold mb-4">Upcoming Interviews</h2>
                            {interviews.length === 0 ? (
                                <p>No upcoming interviews scheduled.</p>
                            ) : (
                                <ul className="divide-y divide-gray-200">
                                    {interviews.map(interview => (
                                        <li key={interview._id} className="py-4">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-lg font-medium">{interview.userId?.name}</p>
                                                    <p className="text-sm text-gray-600">Position: {interview.position}</p>
                                                    <p className="text-sm text-gray-600">Date: {new Date(interview.date).toLocaleDateString()}</p>
                                                    <p className="text-sm text-gray-600">Time: {interview.time}</p>
                                                </div>
                                                <button
                                                    onClick={() => setSelectedInterview(interview)}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                                                >
                                                    Submit Feedback
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Pending Interview Requests */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-2xl font-semibold mb-4">Pending Interview Requests</h2>
                            {pendingRequests.length === 0 ? (
                                <p>No pending interview requests.</p>
                            ) : (
                                <ul className="divide-y divide-gray-200">
                                    {pendingRequests.map(request => (
                                        <li key={request._id} className="py-4">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-lg font-medium">{request.userId?.name}</p>
                                                    <p className="text-sm text-gray-600">Position: {request.position}</p>
                                                    <p className="text-sm text-gray-600">Date: {new Date(request.date).toLocaleDateString()}</p>
                                                    <p className="text-sm text-gray-600">Time: {request.time}</p>
                                                </div>
                                                <div>
                                                    <button
                                                        onClick={() => handleAcceptRequest(request._id)}
                                                        disabled={loading}
                                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm mr-2"
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => handleRejectRequest(request._id)}
                                                        disabled={loading}
                                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
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
                )}

                {/* Feedback Modal */}
                {selectedInterview && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                            <h3 className="text-2xl font-bold mb-4">Submit Feedback for {selectedInterview.userId?.name}</h3>
                            <form onSubmit={handleScoreSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="technicalScore">Technical Score (0-100)</label>
                                    <input
                                        type="number"
                                        id="technicalScore"
                                        min="0"
                                        max="100"
                                        value={scores.technical}
                                        onChange={(e) => setScores({ ...scores, technical: e.target.value })}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="communicationScore">Communication Score (0-100)</label>
                                    <input
                                        type="number"
                                        id="communicationScore"
                                        min="0"
                                        max="100"
                                        value={scores.communication}
                                        onChange={(e) => setScores({ ...scores, communication: e.target.value })}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="problemSolvingScore">Problem Solving Score (0-100)</label>
                                    <input
                                        type="number"
                                        id="problemSolvingScore"
                                        min="0"
                                        max="100"
                                        value={scores.problemSolving}
                                        onChange={(e) => setScores({ ...scores, problemSolving: e.target.value })}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="feedback">Feedback</label>
                                    <textarea
                                        id="feedback"
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        rows="4"
                                        required
                                    ></textarea>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedInterview(null)}
                                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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