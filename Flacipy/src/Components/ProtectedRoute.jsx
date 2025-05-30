// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//     const token = localStorage.getItem('token');

//     if (!token) {
//         return <Navigate to="/admin/login" replace />;
//     }

//     return children;
// };

// export default ProtectedRoute;


import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('adminToken');
    return token ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;

