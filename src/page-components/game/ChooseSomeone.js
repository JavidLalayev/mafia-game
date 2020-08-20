import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from "@material-ui/core/Avatar";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";

export default function NestedGrid() {

    const [active, setActive] = useState(-1);

    const handleClick = (e, id) => {
        setActive(id)
    };

    return (
        <div style={{flexGrow: "1"}}>
            <Grid container spacing={1}>

                {
                    [0,1,2,3,4,5,6,7].map(item => {
                        return <Grid item xs={6} onClick={(e) => {handleClick(e,item)}} className={`${active === item? 'c_player_active': ''}`}>
                                    <Paper className="c_paper">

                                        <Avatar className="cm-auto" alt="Cindy Baker" src="/static/images/avatar/3.jpg" />

                                        <div className="c_chosse_card_body">
                                            Cavid ad;lka kasld;as kasld;
                                        </div>
                                    </Paper>

                                    <div className="c_choosers">
                                        <span>adasd</span>
                                        <br/>

                                        <span>adasd</span>
                                        <br/>

                                        <span>adasd</span>
                                        <br/>

                                        <span>adasd</span>
                                        <br/>

                                        <span>adasd</span>
                                        <br/>
                                        <span>adasd</span>
                                        <br/>

                                    </div>

                                </Grid>
                    })
                }

            </Grid>
        </div>
    );
}
