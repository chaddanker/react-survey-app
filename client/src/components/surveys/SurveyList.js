import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

import { ResponsivePie } from '@nivo/pie';
import Swiper from './Swiper';

class SurveyList extends Component {
	componentDidMount() {
		this.props.fetchSurveys();
	}
	render() {
		return (
		    <div style={{ marginTop: 50, width: '100%'}}>
		    	<SwiperSurveys/>
		    </div>
		);
	}
}

function mapStateToProps({ surveys }) {
	return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);