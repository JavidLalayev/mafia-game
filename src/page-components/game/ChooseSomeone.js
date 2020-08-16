import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        marginBottom: "10px",
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function NestedGrid() {
    const classes = useStyles();

    function FormRow() {
        return (
            <React.Fragment>

                <Grid>
                    <Paper className={classes.paper}>item</Paper>
                </Grid>

                <Grid>
                    <Paper className={classes.paper}>item</Paper>
                </Grid>

            </React.Fragment>
        );
    }

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid  container
                       direction="row"
                       justify="space-around"
                       alignItems="center">
                    <FormRow />
                </Grid>
                <Grid  container
                       direction="row"
                       justify="space-around"
                       alignItems="center">
                    <FormRow />
                </Grid>
                <Grid  container
                       direction="row"
                       justify="space-around"
                       alignItems="center">
                    <FormRow />
                </Grid>

                <Grid  container
                       direction="row"
                       justify="space-around"
                       alignItems="center">
                    <FormRow />
                </Grid>
                <Grid  container
                       direction="row"
                       justify="space-around"
                       alignItems="center">
                    <FormRow />
                </Grid>
                <Grid  container
                       direction="row"
                       justify="space-around"
                       alignItems="center">
                    <FormRow />
                </Grid>


                <Grid  container
                       direction="row"
                       justify="space-around"
                       alignItems="center">
                    <FormRow />
                </Grid>
                <Grid  container
                       direction="row"
                       justify="space-around"
                       alignItems="center">
                    <FormRow />
                </Grid>
                <Grid  container
                       direction="row"
                       justify="space-around"
                       alignItems="center">
                    <FormRow />
                </Grid>



            </Grid>
        </div>
    );
}
