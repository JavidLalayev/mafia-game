import React, {useState} from 'react';

export const myDataContext = React.createContext();
export const userTypesContext = React.createContext();
export const loggingContext = React.createContext();
export const amIMafiaContext = React.createContext();
export const DayContext = React.createContext();
export const liveContext = React.createContext();
export const gameContext = React.createContext();
export const newMessageContext = React.createContext();
export const valueContext = React.createContext();
export const newMafiaMessageContext = React.createContext();


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
        players: [],
        deadPlayers: []
    });
    const [loggedOn, setLoggedOn] = useState(false);
    const [amIMafia, setMafia] = useState(true);
    const [isDay, setDay] = useState(true);
    const [amIDie, setMyLive] = useState(false);
    const [isGameStart, setGame] = useState(false);
    const [newMessage, setNewMessage] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [mafiaNewMessage, setMafiaNewMessage] = React.useState(false);

    return(
        <myDataContext.Provider value={[myData, setMyData]}>

            <userTypesContext.Provider value={[userTypes, setUserTypes]}>

                <loggingContext.Provider value={[loggedOn, setLoggedOn]}>

                    <amIMafiaContext.Provider value={[amIMafia, setMafia]}>

                        <DayContext.Provider value={[isDay, setDay]}>

                            <liveContext.Provider value={[amIDie, setMyLive]}>

                                <gameContext.Provider value={[isGameStart, setGame]}>

                                    <newMessageContext.Provider value={[newMessage, setNewMessage]}>

                                        <valueContext.Provider value={[value, setValue]}>

                                            <newMafiaMessageContext.Provider value={[mafiaNewMessage, setMafiaNewMessage]}>
                                                {children}
                                            </newMafiaMessageContext.Provider>

                                        </valueContext.Provider>

                                    </newMessageContext.Provider>

                                </gameContext.Provider>

                            </liveContext.Provider>

                        </DayContext.Provider>

                    </amIMafiaContext.Provider>

                </loggingContext.Provider>

            </userTypesContext.Provider>

        </myDataContext.Provider>
    )

};

export default Store