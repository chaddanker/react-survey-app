import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
			return(  <div className="container">
				<div className="preloader-wrapper small active">
   					 <div className="spinner-layer spinner-red-only">
      						<div className="circle-clipper left">
        						<div className="circle">
        						</div>
      						</div>
      						<div className="gap-patch">
        						<div className="circle">
        						</div>
     						</div>
     						<div className="circle-clipper right">
        						<div className="circle"></div>
      						</div>
    				</div>
  				</div></div>)

			case false: 
				return (
					<li><a href="/auth/google">login with google</a></li>
					);

			default:
				return [
				<li key="1"><Payments /></li>,
				<li key="2" style={{ margin: '0 10px' }}>
				Credits: {this.props.auth.credits}
				</li>,
				<li key="3"><a href="/api/logout">Logout</a></li>
				];
		}
	}
//if truthy ? 'redirect to' : 'redirect to if falsey'; NEW SYNTAX
	render() {
		return (	
			  <nav>
			    <div className="nav-wrapper">
			      <Link 
			      to={this.props.auth ? '/surveys' : '/'} 
			      className="brand-logo"
			      >
			      Mail You
			      </Link>
			      <ul id="nav-mobile" className="right hide-on-med-and-down">
					{this.renderContent()}
			      </ul>
			    </div>
			  </nav>
		);
	}	
} 

function mapStateToProps({ auth }) {
	return { auth: auth };
}

export default connect(mapStateToProps)(Header);