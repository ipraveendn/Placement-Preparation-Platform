import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AdminLogin = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/admin/login', form);

            if (data.success) {
                localStorage.setItem('adminToken', data.token);
                toast.success('Login successful!');
                navigate('/admin/dashboard');
            } else {
                toast.error(data.message || 'Login failed');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Admin Login</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <input
                    type="email"
                    name="email"
                    placeholder="Admin Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 my-3"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 my-3"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors duration-300 mt-4"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
