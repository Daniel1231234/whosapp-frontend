import {  Routes, Route, useNavigate } from "react-router-dom"
import { PrivateRoutes } from "./PrivateRoutes"
import { PublicRoutes } from "./PublicRoutes"
import { useContext } from "react"
import { AppHeader } from "./cmps/Header/Header"
import { WebsocketProvider, socket } from "./store/SocketContext"
import { AuthContext } from "./store/AuthContext"

const PrivateRoutesWithWebsocket = () => {
    return (
        <WebsocketProvider value={socket}>
            <PrivateRoutes />
        </WebsocketProvider>
    );
};



export const AppRouter = () => {    
    const { loggedinUser, showHeader, token, logout } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
     try {
        logout()
        navigate('/login', {replace:true})
      } catch (err) {
        console.log(err)
      }
    }
    
    return (
        <>
            {showHeader && <AppHeader handleLogout={handleLogout} />}
            <Routes>
                {
                 loggedinUser()  && token() ?
                    <Route path="/*" element={<PrivateRoutesWithWebsocket />} /> :
                    <Route path="/*" element={<PublicRoutes />} />
                }    
            </Routes>
        </>
    )
}