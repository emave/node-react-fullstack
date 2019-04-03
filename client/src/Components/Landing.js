import React from "react";
import {Button, Typography} from "@material-ui/core";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const Landing = (props) => {

    const {auth} = props;

    return <div style={{textAlign: 'center', padding: '50px 20px'}}>
        <Typography variant={'h1'} style={{marginBottom: '10px'}}>Emaily!</Typography>
        <p>Collect feedback from your users</p>
        {auth && <Link to={'/surveys'}><Button variant='contained' color='primary' style={{marginTop: '30px'}}>Go to Dashboard</Button></Link>}
    </div>
};

const mapStateToProps = ({auth}) => ({auth});

export default connect(mapStateToProps)(Landing);