import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
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
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

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
            <List>

                <span style={{marginLeft: "20px", fontSize: "18px", fontWeight: "bold"}}>Oyunçular</span>

                {['Cavid', 'Samir', 'Mutaib', 'adasd'].map((text, index) => (
                    <ListItem button key={text}>

                        <ListItemIcon>
                            <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/1.jpg" />

                        </ListItemIcon>

                        <ListItemText primary={text} />

                    </ListItem>
                ))}
            </List>

            <Divider />


            <List>
                <span style={{marginLeft: "20px", fontSize: "18px", fontWeight: "bold"}}>İzləyənlər</span>

                {['Cavid', 'Samir', 'Mutaib', 'adasd'].map((text, index) => (
                    <ListItem button key={text}>

                        <ListItemIcon>
                            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />

                        </ListItemIcon>

                        <ListItemText primary={text} />

                    </ListItem>
                ))}
            </List>
        </div>);

    return (
        <div style={{position: "absolute", zIndex: "999"}}>

            {
                (true) ?
                    <Fab onClick={toggleDrawer("left", true)} color="secondary" aria-label="add" className={classes.fabButton + " c_show_players_button"}>
                        <PeopleOutlineIcon />
                    </Fab> : ""
            }

            <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
                {list("left")}
            </Drawer>

        </div>
    );
}
