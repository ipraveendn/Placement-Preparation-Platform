import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';


const AddHRPage = () => {

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            await axios.post('http://localhost:5000/api/hr', formData,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
            toast.success('HR Added Successfully!');
            setFormData({ name: '', email: '', department: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add HR');
        }
        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Add HR</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="HR Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="HR Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={formData.department}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <button type="submit" disabled={loading} className="bg-blue-600 text-white py-2 rounded hover:bg-blue-500">
                    {loading ? 'Adding...' : 'Add HR'}
                </button>
            </form>
        </div>
      );
};

export default AddHRPage;
