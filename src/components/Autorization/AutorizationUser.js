import React, { Component } from 'react';
import Login from "./login/Login";
import UserRegistration from "./registration/UserRegistration";
import * as firebase from "firebase";
import styled from 'styled-components';
import { Redirect } from "react-router";
import { connect } from 'react-redux';

const MarginDiv = styled.div`
    margin: 130px auto;
`;
class AutorizationUser extends Component {

    constructor(props) {
        super(props);

        this.changeHandler = this.changeHandler.bind(this);

        this.state = {
            pass: '',
            email: '',
            remember: "SESSION",
            errorMessage: ''
        }
        this.remember = this.remember.bind(this)
    }


    changeHandler(e, field) {
        this.setState({
            [field]: e.target.value,
        })
    }

    remember(event) {
        this.setState({ remember: event.target.checked ? "LOCAL" : "SESSION" })
    }


    checkWichUser (id) {
        for (let i = 0; i < this.props.companies.length; i++) {
            if (id === this.props.companies[i].id) {
                return 'company';
            }
        }
        for (let i = 0; i < this.props.users.length; i++) {
            if (id === this.props.users[i].id) {
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
            if (self.checkWichUser(user.uid) === 'user') {
                localStorage.setItem("current", "user");
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
                {(localStorage.getItem("current") === "user") && this.props.user ?
                    <Redirect to={`/${this.props.user.firstName}${this.props.user.lastName}/profile`} /> :
                    <div className='container'>
                        <Login
                            classForBg={'user-registration'}
                            login={this.state.pass}
                            email={this.state.email}
                            changeHandler={this.changeHandler}
                            signIn={this.signIn.bind(this)}
                            errorMessage={this.state.errorMessage}
                            remember={this.remember} />
                        <UserRegistration />
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



export default connect(mapStateToProps, null)(AutorizationUser);