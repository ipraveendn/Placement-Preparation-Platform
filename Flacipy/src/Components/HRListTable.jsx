import React from 'react';

const HRListTable = ({ hrList }) => {
    if (!hrList || hrList.length === 0) {
        return (
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <p className="text-center text-gray-500">No HR records found</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto bg-gray-200 shadow-md rounded-lg overflow-hidden">
            <h3 className='p-2 text-center'>Hr List</h3>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Department
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {hrList.map((hr, index) => (
                        <tr key={hr._id || index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{hr.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{hr.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{hr.department || 'N/A'}</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HRListTable;
