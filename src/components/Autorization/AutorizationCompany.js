import React, {Component} from 'react';
import Login from "./login/Login";
import CompanyRegistration from "./registration/CompanyRegistration";
import * as firebase from "firebase";
import styled from 'styled-components';
import {Redirect} from "react-router";
import { connect } from 'react-redux';

const MarginDiv = styled.div`
    margin: 130px auto;
`;

class AutorizationCompany extends Component {

    constructor(props) {
        super(props);

        this.changeHandler = this.changeHandler.bind(this);

        this.state = {
            pass: '',
            email: '',
            remember: "SESSION",
            showError: false,
            errorMessage: " ",
            classForButton: '',
        }

        this.remember = this.remember.bind(this)
    }

    changeHandler(e, field) {
        this.setState({
            [field]: e.target.value,
        })
    }
 
    remember(event){
        this.setState({remember: event.target.checked ? "LOCAL" : "SESSION"})
    }

    checkWichUser (id) {
        for (let i = 0; i < this.props.companies.length; i++) {
            if (id === this.props.companies[i].id) {
               this.currentLogName = 'company';
                return 'company';
            }
        }
        for (let i = 0; i < this.props.users.length; i++) {
            if (id === this.props.users[i].id) {
                this.currentLogName = 'user';
                return 'user';
            }
        }

        return false;
    }
    logOut = () => {
        firebase.auth().signOut().then(function () {
            localStorage.removeItem("current")
        }, function (error) {
            console.error('Sign Out Error', error);
        });
    };

    signIn(e) {
        e.preventDefault();
        let self = this;
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence[this.state.remember])
        .then(function() {
        return firebase.auth().signInWithEmailAndPassword(self.state.email, self.state.pass);
        })
        .then(user => {
            if (self.checkWichUser(user.uid) === 'company') {
                localStorage.setItem("current", "company");
            } else {
                this.setState({errorMessage: 'There is no such user please check your email and password'});
                this.logOut();
            }
        })
        .catch(err => {
            this.setState({errorMessage: 'There is no such user please check your email and password'})
        });
    }

    render() {
        return (
            <MarginDiv>
                {(localStorage.getItem("current") === "company") && this.props.user ?
                     <Redirect to={`/${this.props.user.name}/profile`}/> 
                    :
                      <div className='container'>
                        <Login 
                            classForBg = {'company-registration'}
                            login={this.state.pass}
                            email={this.state.email}
                            changeHandler={this.changeHandler}
                            signIn={this.signIn.bind(this)}
                            errorMessage={this.state.errorMessage}
                            remember={this.remember} />
                        <CompanyRegistration/>
                    </div>
                }
            </MarginDiv>
        
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.appReducer.users,
        companies: state.appReducer.companies,
    }
}



export default connect(mapStateToProps, null)(AutorizationCompany);

