import {createContext, useState} from 'react'
export const notification = createContext();

function NotifyContext({children}) {
    const [SUCCESS, setSUCCESS] = useState(false);
    const [ERROR, setERROR] = useState(false)
    const [message, setMessage] = useState("");

    return (
        <notification.Provider value={{SUCCESS,
                                       setSUCCESS,
                                       message,
                                       setMessage,
                                       ERROR,
                                       setERROR}}>
            {children}
        </notification.Provider>
    )
}
export default NotifyContext;