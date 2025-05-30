import React from 'react';

const InterviewCountCard = ({ count }) => (
    <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Interviews Scheduled</h2>
        <p className="text-4xl font-bold text-green-600">{count}</p>
    </div>
);

export default InterviewCountCard;
