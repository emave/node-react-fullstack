import React, {useEffect} from 'react';
import {Card, CardActions, CardContent, CardHeader, Divider, Fab, Typography} from "@material-ui/core";
import PlusIcon from '@material-ui/icons/Add'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {surveysActions} from "../Actions";
import {Grid} from "@material-ui/core";

const Dashboard = (props) => {
  const {surveys, loading, fetchSurveys} = props;

  useEffect(() => {
    fetchSurveys();
  }, []);

  const getSurveys = () => {
    if (!surveys.length && loading) return <div>Loading...</div>;
    if (!surveys.length) return <div>No info to show</div>;
    return surveys.map((survey) => (
      <Grid item xs={12} md={6} lg={4} key={survey._id}>
        <Card>
          <CardHeader title={survey.title}/>
          <Divider/>
          <CardContent>
            <div style={{margin: '20px 0'}}>
              <h3 style={{marginBottom: '7px'}}>Survey subject:</h3>
              <p>{survey.subject}</p>
            </div>
            <div style={{margin: '20px 0'}}>
              <h3 style={{marginBottom: '7px'}}>Survey body:</h3>
              <p>{survey.body}</p>
            </div>
          </CardContent>
          <Divider/>
          <CardContent>
            <Grid container spacing={16}>
              <Grid item xs={6} style={{textAlign: 'center', color: 'green'}}>
                <h3>Yes: {survey.yes}</h3>
              </Grid>
              <Grid item xs={6} style={{textAlign: 'center', color: 'red'}}>
                <h3>No: {survey.no}</h3>
              </Grid>
            </Grid>
          </CardContent>
          <Divider/>
          <CardActions>
            <Typography style={{fontSize: '14px', marginLeft: '15px', marginTop: '5px'}} color="textSecondary"
                        gutterBottom>
              {new Date(survey.dateSent).toLocaleDateString()}
            </Typography>
          </CardActions>
        </Card>
      </Grid>
    ))
  };

  return (<div>
    <Grid container spacing={16}>
      {getSurveys()}
    </Grid>
    <Link to={'/surveys/new'} style={{position: 'fixed', bottom: '20px', right: '20px'}}>
      <Fab color={'secondary'}>
        <PlusIcon/>
      </Fab>
    </Link>
  </div>)
};

const mapStateToProps = ({surveys}) => ({
  surveys: surveys.surveys,
  loading: surveys.loading
});

const mapDispatchToProps = dispatch => ({
  fetchSurveys: () => dispatch(surveysActions.fetchSurveys())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);