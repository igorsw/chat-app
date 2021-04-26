import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


import { auth } from "../firebaseConfig";

import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar(props) {
    const classes = useStyles();
    const history = useHistory();

    const handleLogout = () => {
        auth.signOut();
        history.push("/")
    }

    return (
        <div className={classes.root}>
            <AppBar style={{ backgroundColor: 'black' }} position="static">
                <Toolbar>
                    <IconButton onClick={() => history.push("/")}  edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Chat-app
                    </Typography>
                    <Typography variant="h6" className={classes.title}>

                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}