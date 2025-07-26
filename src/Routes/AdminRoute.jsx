import React, { Children, useContext } from 'react';
import { Navigate } from 'react-router';
import useRole from '../Hooks/useRole';
import { AuthContext } from '../Contexts/AuthContext';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
     const { role, loading:roleLoading } = useRole()

    if (loading || roleLoading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if (!user || role !== 'admin') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }

    return children;
};

export default AdminRoute;
