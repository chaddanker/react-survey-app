//SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
	// constructor(props) {
	// 	super(props);

	// 	this.state = { new: true};
	// }
	state = { showFormReview: false }; //creates an inits state in constructor - shorter way of above

	renderContent() {
		if(this.state.showFormReview) {
			return <SurveyFormReview
					onCancel={() => this.setState({ showFormReview: false })} 
					/>;
		}

		return <SurveyForm 
				onSurveySubmit={() => this.setState({ showFormReview: true })}	
				/>;
		
	}

	render() {
		return (
			<div className='container' style={{marginTop: 20}}>
			 {this.renderContent()}
			</div>
			);
	}
}

export default reduxForm({
	form: 'surveyForm'
})(SurveyNew);