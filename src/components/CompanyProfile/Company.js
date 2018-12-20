import React, {Component} from 'react';
import {NavLink, Route} from "react-router-dom";
import CompanyTests from './CompanyTests';
import InvitedUsers from "./InvitedUsers";
import {Redirect} from "react-router";
import CompanyProfile from "./CompanyProfile";

export default class Company extends Component {
    render() {
        return (
            (this.props.user && this.props.user.type === "company") ?
                <div className="containerUser">
                    <nav className="tabBar">
                        <NavLink exact activeClassName="active" to={`/${this.props.user.name}/profile`}>Profile</NavLink>
                        <NavLink activeClassName="active" to={`/${this.props.user.name}/tests`}>Tests</NavLink>
                        <NavLink activeClassName="active" to={`/${this.props.user.name}/invited-users`}>Invited Users</NavLink>
                    </nav>
                    <Route path="/:company/profile" component={() => <CompanyProfile user={this.props.user} />}/>
                    <Route path="/:company/tests" component={() => 
                        <CompanyTests
                             user={this.props.user} 
                             
                        />}/>
                    <Route path="/:company/invited-users" component={() => <InvitedUsers user={this.props.user} />}/>

                </div> :
                <Redirect to='/authorization'/>
        );
    }
}

