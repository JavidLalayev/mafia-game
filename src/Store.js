import React, {useState} from 'react';

export const myDataContext = React.createContext();
export const userTypesContext = React.createContext();
export const loggingContext = React.createContext();

const Store = ({children}) => {

    const [myData, setMyData] = useState({
        username: "",
        pictureUrl: "",
        mySocketId: ""
    });
    const [userTypes, setUserTypes] = useState({
        allUsers: [],
        spectators: [],
        players: []
    });
    const [loggedOn, setLoggedOn] = useState(false);

    return(
        <myDataContext.Provider value={[myData, setMyData]}>

            <userTypesContext.Provider value={[userTypes, setUserTypes]}>

                <loggingContext.Provider value={[loggedOn, setLoggedOn]}>
                    {children}
                </loggingContext.Provider>

            </userTypesContext.Provider>

        </myDataContext.Provider>
    )

};

export default Store