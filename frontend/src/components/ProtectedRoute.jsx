import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    if (!user) {
        // Rediriger vers la page de connexion s'il n'est pas authentifié
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Rediriger vers l'accueil s'il n'a pas les permissions
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
