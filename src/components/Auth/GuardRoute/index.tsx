import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from '../../../hooks/useAuth';

const GuardedRoute = ({ children, isAuthPage }: { children: JSX.Element, isAuthPage?: boolean }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user && !isAuthPage) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    if (user && isAuthPage) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    return(children);
};

export default GuardedRoute;
