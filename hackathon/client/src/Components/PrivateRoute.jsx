import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
  const { currentSeller } = useSelector((state) => state.seller);
  return currentSeller ? <Outlet /> : <Navigate to='/login' />;
}




