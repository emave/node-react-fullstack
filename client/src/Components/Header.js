import React from 'react';
import {Link} from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, IconButton, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {connect} from "react-redux";
import {authActions} from "../Actions";

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};


const Header = (props) => {
    const {classes, auth, logout} = props;

    const renderContent = () => {
        switch (auth) {
            case null:
                return;
            case false:
                return <Button href={'/auth/google'} color="secondary" variant='contained'>Login with google</Button>;
            default:
                return [
                    <p key={'3'} style={{ fontSize: '16px' , color: '#fff', marginRight: '15px'}}>Credits: <strong>{auth.credits}</strong></p>,
                    <Button key={'1'} color="secondary" variant='contained'>Add credits</Button>,
                    <Button key={'2'} onClick={logout} style={{marginLeft: '10px', color: '#fff', borderColor: '#fff'}} color="secondary" variant={'outlined'}>Logout</Button>,
                ]
        }
    };

    return (
        <nav className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h4" color="inherit" className={classes.grow}>
                        <Link style={{color: '#fff'}} to={auth ? '/surveys' : '/'}>Emaily</Link>
                    </Typography>
                    {renderContent()}
                </Toolbar>
            </AppBar>
        </nav>
    );
};

const mapStateToProps = ({auth}) => ({auth});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(authActions.logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));