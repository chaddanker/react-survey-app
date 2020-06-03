//SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'; //nearly identical to connect helper
import SurveyField from './SurveyField';
import formFields from './formFields';
import _ from 'lodash'; //for _.map function fo array
import { Link } from 'react-router-dom'; //for use of <Link on="/blah"></Link> NB
import validateEmails from '../../utils/validateEmails';

class SurveyForm extends Component {

	renderFields() { //_.map returns list
		return _.map(formFields, ({ label, name}) => {
			return (
				<Field key={name} component={SurveyField} type="text" label={label} name={name}/>
			);
		});

	}

	render() {
		return (
			<div>
			<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>

				 {this.renderFields()}

				 <Link to="/surveys" className="red btn-flat white-text">
				 	Cancel
				 </Link>

				 <button className="teal btn-flat right white-text" type="submit">
				 	Next
				 	<i className="material-icons right" >done</i>
				 </button>


			</form>
			</div>
		);
	}
}

function validate(values) { //values is object containing all values off of form
	const errors = {};

 	errors.recipients = validateEmails(values.recipients || ''); 

	_.each(formFields, ({name, noValueError}) => {
		if (!values[name]) {
			errors[name] = noValueError;
		}
	}); // loop runs over each field in array 
	return errors;
}

export default reduxForm({ //redux form helper
	validate, //ES6 older - validate: validate,
	form: 'surveyForm',
	destroyOnUnmount: false //so that we dont lose values going back and forth to form review
})(SurveyForm);