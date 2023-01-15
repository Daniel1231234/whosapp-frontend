import { Navigate, Route, Routes } from 'react-router-dom';
import { ChatPage } from './pages/Chat/ChatPage';
import { Home } from './pages/Home/Home';
import { Invite } from './pages/Invite/Invite';
import { Profile } from './pages/Profile';

export const PrivateRoutes = () => {
    
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/chat/:_id' element={<ChatPage   />} />
            <Route path='/user/:_id' element={<Profile />} />
            <Route path="/join/:roomId" element={<Invite />} />
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
};
