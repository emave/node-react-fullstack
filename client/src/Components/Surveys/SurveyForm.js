import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {Link} from "react-router-dom";
import {Button, Card, CardActions, CardContent, CardHeader, Grid, Divider} from "@material-ui/core";
import CustomInput from './SurveyField';
import ArrowForward from '@material-ui/icons/ArrowForward';
import validateEmails from '../../Utils/validateEmails';

const FIELDS = [
  {
    label: 'Survey title',
    name: 'title',
    required: true
  },
  {
    label: 'Subject line',
    name: 'subject',
    required: true
  },
  {
    label: 'Email body',
    name: 'body',
    required: true
  },
  {
    label: 'Recipients list',
    name: 'recipients',
    required: true
  },
];

const SurveyForm = (props) => {
  const {handleSubmit} = props;
  return (
    <Grid container spacing={16} style={{marginTop: '50px', maxWidth: '100%'}}>
      <Grid item xs={12} md={2} lg={4}/>
      <Grid item xs={12} md={8} lg={4}>
        <Card
          component={'form'}
          onSubmit={handleSubmit}
        >
          <CardHeader title={'Enter an email content'}/>
          <CardContent>
            {FIELDS.map(field => (
              <Field
                key={field.name}
                {...field}
                type={'text'}
                component={CustomInput}
              />))}
          </CardContent>
          <Divider/>
          <CardActions style={{justifyContent: 'space-between'}}>
            <Link to={'/surveys'}><Button color={'secondary'}>Cancel</Button></Link>
            <Button type={'submit'} color={'primary'} variant='contained'>Next<ArrowForward style={{marginLeft: '10px', height: '22px'}}/></Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} md={2} lg={4}/>
    </Grid>
  );
};

function mapStateToProps(state) {
  return {};
}

const validate = (values) => {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  FIELDS.forEach(({name}) => {
    if(!values[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  return errors;
};

const surveyForm = reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);

export default connect(mapStateToProps)(surveyForm);