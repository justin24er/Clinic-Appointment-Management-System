import { createContext, useState, useEffect } from 'react'
export const notification = createContext();

function NotifyContext({children}) {
    const [SUCCESS, setSUCCESS] = useState(false);
    const [ERROR, setERROR] = useState(false)
    const [message, setMessage] = useState("");

    useEffect(() => {
        const clear = setTimeout(() => {
            setSUCCESS(false)
            setERROR(false)
        },2000)

        return () => clearTimeout(clear)    
    },[SUCCESS,ERROR])

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