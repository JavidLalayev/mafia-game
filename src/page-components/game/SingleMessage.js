import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';

export default function SingleMessage(props) {


    return (
        <div style={{flexGrow: "1"}}>
            <Grid container spacing={1} style={{textAlign: "left"}}>
                {
                    props.message.content
                }
            </Grid>
        </div>
    );
}
