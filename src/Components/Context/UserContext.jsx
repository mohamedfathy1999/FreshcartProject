  import { createContext, useContext, useEffect, useState } from "react";

  export let UserContext = createContext()

export default function UserContextProvider({ children }) {


   let [userData, setUserData] = useState(null);

    useEffect(() => {

        if (localStorage.getItem('userToken'))
            setUserData(localStorage.getItem('userToken'))


    }, [])



    return <UserContext.Provider value={{ userData, setUserData }}>

        {children}
    </UserContext.Provider>



}






