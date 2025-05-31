import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const HrLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { data } = await axios.post('http://localhost:5000/api/hr/login', { email, password });
            localStorage.setItem('hrToken', data.token);
            toast.success("Login successful");
            navigate('/hr/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
            toast.error(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">HR Login</h2>

                {error && (
                    <div className="mb-4 text-red-600 bg-red-100 p-3 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md
                        hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                        ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default HrLogin;
