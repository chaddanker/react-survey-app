//if file returns component then uppercase A eg. App.js

import React, { Component } from 'react'; //import statements on front end access to babel etc.
import { BrowserRouter, Route} from 'react-router-dom'; //NB!
import { connect } from 'react-redux';
import * as actions from '../actions';

//REACT COMPONENTS -DUMMY COMPONENTS FOR NOW

import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>


class App extends Component {  //setup routing rules for app //header always on screen //react router
	componentDidMount() {
		this.props.fetchUser(); //reference to export below
	}

	render() {
		return(
			<div className="container">
				<BrowserRouter>
					<div> 
						<Header />
						<Route exact path="/" component={Landing} />
						<Route exact path="/surveys" component={Dashboard} />
						<Route path="/surveys/new" component={SurveyNew} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default connect(null, actions)(App);//actions passed into app as props