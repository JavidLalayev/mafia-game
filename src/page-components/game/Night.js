import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
    list: {
        width: 300,
    },
    fullList: {
        width: 'auto',
    },
});

export default function TemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        bottom: false,
    });

    // setTimeout(() => {
    //     setState({
    //         bottom:  !state.bottom});
    // }, 2000);

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (<div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >


        <div className="main-container">
            <div className="stars-container">
                <div className="star star--1"></div>
                <div className="star star--2"></div>
                <div className="star star--3"></div>
                <div className="star star--4"></div>
                <div className="star star--5"></div>
                <div className="star star--6"></div>
                <div className="star star--7"></div>
                <div className="star star--8"></div>
                <div className="star star--9"></div>
                <div className="star star--10"></div>
                <div className="star star--11"></div>
                <div className="star star--12"></div>
                <div className="star star--13"></div>
                <div className="star star--14"></div>
                <div className="star star--15"></div>
                <div className="star star--16"></div>
                <div className="star star--17"></div>
                <div className="star star--18"></div>
                <div className="star star--19"></div>
                <div className="star star--20"></div>
            </div>
            <div className="meteors-container">
                <div className="meteor meteor--1"></div>
                <div className="meteor meteor--2"></div>
            </div>
            <div className="cloud-upper cloud-upper--1">
                <div className="cloud-shape cloud-shape--1"></div>
                <div className="cloud-shape cloud-shape--2"></div>
                <div className="cloud-shape cloud-shape--3"></div>
            </div>
            <div className="cloud-upper cloud-upper--2">
                <div className="cloud-shape cloud-shape--1"></div>
                <div className="cloud-shape cloud-shape--2"></div>
                <div className="cloud-shape cloud-shape--3"></div>
            </div>

            <div className="clouds-lower">
                <div className="clouds-lower_cloud clouds-lower_cloud--left">
                    <div className="cloud-circle cloud-circle--1-light"></div>
                    <div className="cloud-circle cloud-circle--2-light"></div>
                    <div className="cloud-circle cloud-circle--1"></div>
                    <div className="cloud-circle cloud-circle--2"></div>
                </div>
                <div className="clouds-lower_cloud clouds-lower_cloud--rigth">
                    <div className="cloud-circle cloud-circle--1-light"></div>
                    <div className="cloud-circle cloud-circle--2-light"></div>
                    <div className="cloud-circle cloud-circle--1"></div>
                    <div className="cloud-circle cloud-circle--2"></div>
                </div>
            </div>

            <div className="moon-container">
                <div className="moon__light-container">
                    <div className="moon__light moon__light--1"></div>
                    <div className="moon__light moon__light--2"></div>
                    <div className="moon__light moon__light--3"></div>
                </div>
                <div className="moon"></div>
                <div className="moon__stain-container">
                    <div className="moon__stain moon__stain--1"></div>
                    <div className="moon__stain moon__stain--2"></div>
                    <div className="moon__stain moon__stain--3"></div>
                </div>
            </div>
        </div>

        </div>);

    return (
        <div style={{position: "absolute", zIndex: "999"}}>

            <Drawer anchor={"bottom"} open={state["bottom"]} onClose={toggleDrawer("bottom", false)}>
                {list("bottom")}
            </Drawer>

        </div>
    );
}
