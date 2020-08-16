import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import GameScreen from "./GameScreen";
import MessageScreen from "./MessageScreen.js";

const TabPanel = React.memo(props => {

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
});
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


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
}));

const FullWidthTabs = React.memo(props => {

    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div style={{height: "100%"}}>

            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
                // className={"c_game"}
            >

                <TabPanel value={value} hidden={false} index={0} dir={theme.direction}>
                    <GameScreen/>
                </TabPanel>

                <TabPanel className={"c_game2"} value={value} hidden={false}  index={1} dir={theme.direction}>
                    <MessageScreen/>
                </TabPanel>

                <TabPanel value={value} hidden={false}  index={2} dir={theme.direction}>
                    asdasdass
                </TabPanel>

            </SwipeableViews>

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
                    <Tab label="Chat" {...a11yProps(1)} />
                    <Tab label="Mafia Chat" {...a11yProps(2)} />
                </Tabs>
            </AppBar>

        </div>
    );
});

export default FullWidthTabs;


