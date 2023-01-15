import {  Routes, Route } from "react-router-dom"
import { PrivateRoutes } from "./PrivateRoutes"
import { PublicRoutes } from "./PublicRoutes"
import { useContext, useEffect, useState } from "react"
import { AppHeader } from "./cmps/Header/Header"
import { UsersContext } from "./store/UserContext"
import { WebsocketProvider, socket } from "./store/SocketContext"
import { AuthContext } from "./store/AuthContext"
import { User } from "./models/User"

const PrivateRoutesWithWebsocket = () => {
    return (
        <WebsocketProvider value={socket}>
            <PrivateRoutes />
        </WebsocketProvider>
    );
};


export const AppRouter = () => {    
    const userCtx = useContext(UsersContext)
    const user =  userCtx.user()
    const { isAuth } = useContext(AuthContext)
    

    
    
    return (
        <>
            {userCtx.showHeader && <AppHeader />}
            <Routes>
                {
                isAuth || user ?
                    <Route path="/*" element={<PrivateRoutesWithWebsocket />} /> :
                    <Route path="/*" element={<PublicRoutes />} />
                }    
            </Routes>
        </>
    )
}