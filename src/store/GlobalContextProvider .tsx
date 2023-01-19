import React, { useState } from "react";
import  UsersContextProvider  from "./UserContext";
import ChatsContextProvider from "./ChatContext";
import AuthContextProvider from "./AuthContext";



export const GlobalContextProvider = ({ children }:{children:React.ReactNode}) => {
    return (
        <AuthContextProvider>
            <UsersContextProvider>
                <ChatsContextProvider>
                    {children}
                </ChatsContextProvider>
            </UsersContextProvider>
        </AuthContextProvider>
    )
}





