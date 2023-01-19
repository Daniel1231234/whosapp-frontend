import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthPage } from './pages/Auth/AuthPage';



export const PublicRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={<AuthPage  />} />
            <Route path='*' element={<Navigate to='/login' replace  />} />
        </Routes>
    );
};