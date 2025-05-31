import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const HrDashboard = () => {
    const navigate = useNavigate();
    const [interviews, setInterviews] = useState([]);
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
        fetchInterviews();
    }, []);

    const fetchInterviews = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('hrToken');
            if (!token) {
                navigate('/hr/login');
                return;
            }

            const response = await axios.get('http://localhost:5000/api/mock-interview/hr-interviews', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                setInterviews(response.data.data);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to fetch interviews');
            if (error.response?.status === 401) {
                navigate('/hr/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleScoreSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('hrToken');
            const response = await axios.post(
                `http://localhost:5000/api/mock-interview/submit-scores/${selectedInterview._id}`,
                {
                    scores,
                    feedback
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (response.data.success) {
                toast.success('Scores submitted successfully');
                setSelectedInterview(null);
                setScores({ technical: '', communication: '', problemSolving: '' });
                setFeedback('');
                fetchInterviews();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit scores');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('hrToken');
        navigate('/hr/login');
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
                        {/* Interview List */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold mb-4">Upcoming Interviews</h2>
                            <div className="space-y-4">
                                {interviews.map((interview) => (
                                    <div
                                        key={interview._id}
                                        className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                                        onClick={() => setSelectedInterview(interview)}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium">{interview.position}</h3>
                                                <p className="text-sm text-gray-600">
                                                    {interview.userId.name}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {new Date(interview.date).toLocaleDateString()} at {interview.time}
                                                </p>
                                            </div>
                                            <span className={`px-2 py-1 rounded text-sm ${
                                                interview.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                interview.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {interview.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Score Submission Form */}
                        {selectedInterview && (
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-xl font-semibold mb-4">Submit Scores</h2>
                                <form onSubmit={handleScoreSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Technical Score
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={scores.technical}
                                            onChange={(e) => setScores(prev => ({ ...prev, technical: e.target.value }))}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Communication Score
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={scores.communication}
                                            onChange={(e) => setScores(prev => ({ ...prev, communication: e.target.value }))}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Problem Solving Score
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={scores.problemSolving}
                                            onChange={(e) => setScores(prev => ({ ...prev, problemSolving: e.target.value }))}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Feedback
                                        </label>
                                        <textarea
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            rows="4"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        Submit Scores
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HrDashboard; 