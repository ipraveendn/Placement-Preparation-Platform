import React from 'react';

const HRCountCard = ({ count }) => (
    <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Total HRs</h2>
        <p className="text-4xl font-bold text-blue-600">{count}</p>
    </div>
);

export default HRCountCard;
