import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectors } from 'redux/selectors';

export default function PrivateRoutes() {
  const { isLogged } = selectors;
  const isLoggedIn = useSelector(isLogged);
  const location = useLocation();

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" state={{ location }} replace />;
}
