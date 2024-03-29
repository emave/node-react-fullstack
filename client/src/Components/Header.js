import React from 'react';
import {Link} from "react-router-dom";
import {AppBar, Toolbar, Typography, Button, withStyles} from '@material-ui/core';
import {connect} from "react-redux";
import {authActions, modalActions} from "../Actions";

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
  const {classes, auth, logout, openModal} = props;

  const renderContent = () => {
    switch (auth) {
      case null:
        return;
      case false:
        return <Button href={'/auth/google'} color="secondary" variant='contained'>Login with google</Button>;
      default:
        return [
          <p key={'3'}
             style={{fontSize: '16px', color: '#fff', marginRight: '15px'}}>Credits: <strong>{auth.credits}</strong>
          </p>,
          <Button key={'1'} color="secondary" variant='contained' onClick={() => openModal('billingDialog')}>Add credits</Button>,
          <Button key={'2'} onClick={logout} style={{marginLeft: '10px', color: '#fff', borderColor: '#fff'}}
                  color="secondary" variant={'outlined'}>Logout</Button>,
        ]
    }
  };

  return (
    <nav className={classes.root}>
      <AppBar position="fixed" style={{top: 0, bottom: 'auto'}}>
        <Toolbar>
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
  logout: () => dispatch(authActions.logoutUser()),
  openModal: (modalName) => dispatch(modalActions.openModal(modalName))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));