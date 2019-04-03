import React from 'react';
import {connect} from 'react-redux';
import {Button, Card, CardActions, CardContent, CardHeader, Divider, Grid} from "@material-ui/core";
import Done from "@material-ui/icons/Done";
import {surveyFormActions} from "../../Actions";
import {withRouter} from 'react-router-dom';

const SurveyReview = (props) => {
  const {onCancel, form: { surveyForm: { values } }, submitSurvey, history} = props;
  return (
    <Grid container spacing={16} style={{marginTop: '50px', maxWidth: '100%'}}>
      <Grid item xs={12} md={2} lg={4}/>
      <Grid item xs={12} md={8} lg={4}>
        <Card>
          <CardHeader title={'Please confirm your entries'}/>
          <CardContent>
            {Object.keys(values).map(key => (
              <div key={key} style={{borderTop: '1px solid #eee', padding: '15px 20px'}}>
                <p style={{textTransform: 'capitalize', color: '#aaa'}}>{key}</p>
                <h4 style={{margin: '10px 0 0'}}>{values[key]}</h4>
              </div>))
            }
          </CardContent>
          <Divider/>
          <CardActions style={{justifyContent: 'space-between'}}>
            <Button color={'secondary'} onClick={onCancel}>Back</Button>
            <Button color={'primary'} variant='contained' onClick={() => submitSurvey(values, history)}>
              Send survey
              <Done style={{marginLeft: '10px', height: '22px'}}/></Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} md={2} lg={4}/>
    </Grid>
  );
};

const mapStateToProps = ({form}) => ({form});

const mapDispatchToProps = dispatch => ({
  submitSurvey: (values, history) => dispatch(surveyFormActions.submitSurvey(values, history))
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(withRouter(SurveyReview));
