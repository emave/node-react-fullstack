import React, {useState} from 'react';
import SurveyForm from './SurveyForm'
import SurveyFormReview from './SurveyFormReview';
import {reduxForm} from "redux-form";

const SurveyNew = () => {
  const [showFormReview, setReview] = useState(false);

  return (
    <div>
      {showFormReview ? <SurveyFormReview onCancel={() => setReview(false)}/> : <SurveyForm onSubmit={() => setReview(true)}/>}
    </div>
  );
};

export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);

