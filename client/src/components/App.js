//if file returns component then uppercase A eg. App.js

import React, { Component } from 'react'; //import statements on front end access to babel etc.
import { BrowserRouter, Route} from 'react-router-dom'; //NB!
import { connect } from 'react-redux';
import * as actions from '../actions';

//REACT COMPONENTS -DUMMY COMPONENTS FOR NOW

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';


class App extends Component {  //setup routing rules for app //header always on screen //react router
	componentDidMount() {
		this.props.fetchUser(); //reference to export below
	}

	render() {
		return(
			<div>
				<BrowserRouter>
					<div> 
						<Header />
						<div style={{ width: '100vw' }}>
							<Route exact path="/" component={Landing} />
							<Route exact path="/surveys" component={Dashboard} />
							<Route path="/surveys/new" component={SurveyNew} />
						</div>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default connect(null, actions)(App);//actions passed into app as props