import React, {useState} from 'react';

export const myDataContext = React.createContext();
export const userTypesContext = React.createContext();
export const loggingContext = React.createContext();
export const amIMafiaContext = React.createContext();
export const DayContext = React.createContext();
export const liveContext = React.createContext();

const Store = ({children}) => {

    const [myData, setMyData] = useState({
        username: "",
        pictureUrl: "",
        mySocketId: "",
        myRole: ""
    });
    const [userTypes, setUserTypes] = useState({
        allUsers: [],
        spectators: [],
        players: []
    });
    const [loggedOn, setLoggedOn] = useState(false);
    const [amIMafia, setMafia] = useState(false);
    const [isDay, setDay] = useState(true);
    const [amIDie, setMyLive] = useState(false);


    return(
        <myDataContext.Provider value={[myData, setMyData]}>

            <userTypesContext.Provider value={[userTypes, setUserTypes]}>

                <loggingContext.Provider value={[loggedOn, setLoggedOn]}>

                    <amIMafiaContext.Provider value={[amIMafia, setMafia]}>

                        <DayContext.Provider value={[isDay, setDay]}>

                            <liveContext.Provider value={[amIDie, setMyLive]}>
                                {children}
                            </liveContext.Provider>

                        </DayContext.Provider>

                    </amIMafiaContext.Provider>

                </loggingContext.Provider>

            </userTypesContext.Provider>

        </myDataContext.Provider>
    )

};

export default Store