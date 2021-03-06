import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import GameScreen from "./GameScreen";
import MessageScreen from "./CivilMessage/MessageScreen";
import MafiaMessageScreen from "./MafiaMessage/MafiaMessageScreen";
import {amIMafiaContext, newMafiaMessageContext, newMessageContext, valueContext} from "../../Store";
import socket from "../../services/socketIOService";
import Badge from '@material-ui/core/Badge';

const TabPanel = (props) => {

    const { children, value, index, ...other } = props;

    return (
        <div
            className={"c_game"}
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {children}
        </div>
    );
};
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}


const FullWidthTabs = (props) => {

    const theme = useTheme();
    const [value, setValue] = useContext(valueContext);
    const [newMessage, setNewMessage] = useContext(newMessageContext);
    const [mafiaNewMessage, setMafiaNewMessage] = useContext(newMafiaMessageContext);
    const [amIMafia, setMafia] = useContext(amIMafiaContext);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
        return false;
    };

    useEffect(() => {
        if (value === 1){
            setNewMessage(false);
        }

        if (value === 2){
            setMafiaNewMessage(false);
        }
    }, [value]);

    return (
        <div style={{height: "100%"}}>

            {
                !amIMafia
                    ?
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >

                        <TabPanel value={value} hidden={false} index={0} dir={theme.direction}>
                            <GameScreen/>
                        </TabPanel>

                        <TabPanel className={"c_game2"} value={value} hidden={false}  index={1} dir={theme.direction}>
                            <MessageScreen/>
                        </TabPanel>

                    </SwipeableViews>
                    :
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >

                        <TabPanel value={value} hidden={false} index={0} dir={theme.direction}>
                            <GameScreen/>
                        </TabPanel>

                        <TabPanel className={"c_game2"} value={value} hidden={false}  index={1} dir={theme.direction}>
                            <MessageScreen/>
                        </TabPanel>

                        <TabPanel className={"c_game2"}  value={value} hidden={false}  index={2} dir={theme.direction}>
                            <MafiaMessageScreen/>
                        </TabPanel>

                    </SwipeableViews>
            }

            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Oyun" {...a11yProps(0)} />
                    <Tab label={<Badge color="secondary" variant="dot" invisible={!newMessage}>Chat</Badge>} {...a11yProps(1)} />

                    {
                        amIMafia ? <Tab label={<Badge color="secondary" variant="dot" invisible={!mafiaNewMessage}>Mafia Chat</Badge>} {...a11yProps(2)} /> : null
                    }

                </Tabs>
            </AppBar>

        </div>
    );
};

export default FullWidthTabs;




