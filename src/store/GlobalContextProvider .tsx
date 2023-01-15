import React from "react";
import  UsersContextProvider  from "./UserContext";
import ChatsContextProvider from "./ChatContext";



export const GlobalContextProvider = ({ children }:{children:React.ReactNode}) => {
    return (
            <UsersContextProvider>
                <ChatsContextProvider>
                    {children}
                </ChatsContextProvider>
            </UsersContextProvider>
    )
}
