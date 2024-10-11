import { Navigate, useLocation } from "react-router-dom";



// eslint-disable-next-line react/prop-types
function CheckAuth({ isAuthenticated, user, children }) {

    const location = useLocation();

    if (!isAuthenticated &&
        !(location.pathname.includes('/login') ||
            location.pathname.includes('/register'))
    ) {
        return <Navigate to="/auth/login" />
    }

    if (isAuthenticated &&
        (location.pathname.includes('/login') ||
            location.pathname.includes('/register'))
    ) {
        // eslint-disable-next-line react/prop-types
        if (user?.role === 'admin') {
            return <Navigate to="/admin/dashboard" />;
        } else {
            return <Navigate to="/shop/home" />
        }
    }
    // eslint-disable-next-line react/prop-types
    if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes('admin')) {
        return <Navigate to="/unauth-page" />
    }
    // eslint-disable-next-line react/prop-types
    if (isAuthenticated && user?.role === 'admin' && location.pathname.includes('shop')) {
        return <Navigate to="/admin/dashboard" />
    }

    return <>{children}</>
}

export default CheckAuth;