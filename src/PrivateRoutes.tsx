import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from 'react-router-dom';
import { CustomSpinner } from "./cmps/UI/CustomSpinner";
import { ChatPage } from './pages/Chat/ChatPage';
import { Home } from './pages/Home/Home';
import { Invite } from './pages/Invite/Invite';
const UserProfile = lazy(() => import('./pages/Profile/Profile'))


const UserProfilePage = () => {
    return <Suspense fallback={<CustomSpinner />}><UserProfile /></Suspense>
}

export const PrivateRoutes = () => {
    
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/profile' element={<UserProfilePage />} />
            <Route path='/chat/:_id' element={<ChatPage />} />
            <Route path="/join/:roomId" element={<Invite />} />
            <Route path='*' element={<Navigate to='/home'  />} />
        </Routes>
    );
};
