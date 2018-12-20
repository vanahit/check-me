import React, { Component } from 'react';
import * as firebase from "firebase";
import styled from 'styled-components';

const LoginDiv = styled.div`
    font-size: 34px;
    color: white;
    font-weight: bold;
    text-align: center;
    margin-bottom: 60px;
`;

class UserRegistration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmedPassword: '',
            languages: [],
            skillsContent: false,
            validErrors: { firstName: true, lastName: true, email: true, password: true, confirmedPassword: true, languages: true },
            progress: 0,
            progressColor: "red",
            progressColorConfirm: "white",
            errorMessage: ""
        }
    }

    changeField(e, field) {
        console.log(field);

        this.setState({ [field]: e.target.value })
        if (field === "password") {
            this.checkPassword(e.target.value)
            this.checkConfirmedPassword(e.target.value, this.state.confirmedPassword)
        }
        if (field === "confirmedPassword") {
            this.checkConfirmedPassword(this.state.password, e.target.value)
        }
    }

    checkPassword(password) {
        let strength = 0;
        if (password.match(/[a-zA-Z0-9][a-zA-Z0-9]+/)) {
            strength += 1
        }
        if (password.match(/[~<>?]+/)) {
            strength += 1
        }
        if (password.match(/[!@$%^&*()]+/)) {
            strength += 1
        }
        if (password.match(/[A-Z]/g)) {
            strength += 1
        }
        if (password.match(/[0-9]/g)) {
            strength += 1
        }

        switch (strength) {
            case 0:
                this.setState({ progress: 0, progressColor: "red" });
                break
            case 1:
                this.setState({ progress: 20, progressColor: "red" });
                break
            case 2:
                this.setState({ progress: 40, progressColor: "red" });
                break
            case 3:
                this.setState({ progress: 60, progressColor: "orange" });
                break
            case 4:
                this.setState({ progress: 80, progressColor: "orange" });
                break
            default:
                this.setState({ progress: 100, progressColor: "green" });
          
        }
    }

    checkConfirmedPassword(password, confirmedPassword) {
        if (password.substr(0, confirmedPassword.length) === confirmedPassword && confirmedPassword.length === password.length && confirmedPassword.length !== 0) {
            this.setState({ progressColorConfirm: "green" })
        } else if (confirmedPassword.length === 0) {
            this.setState({ progressColorConfirm: "white" })
        } else if (password.substr(0, confirmedPassword.length) === confirmedPassword && confirmedPassword.length !== password.length) {
            this.setState({ progressColorConfirm: "orange" })
        } else {
            this.setState({ progressColorConfirm: "red" })
        }
    }


    changeCheckboxHandler(e, lang) {
        let languages = this.state.languages;
        if (e.target.checked) {
            languages.push(lang);
        } else {
            languages = languages.filter(item => item !== lang);
        }
        this.setState({ languages });
        console.log(languages)
    }

    showSkills() {
        this.setState({ skillsContent: !this.state.skillsContent })
    }

    signUpUser() {

        if (this.state.password === this.state.confirmedPassword && this.state.password && this.state.firstName && this.state.lastName && this.state.email && this.state.languages.length !== 0) {

            const user = { ...this.state };


            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    firebase.auth().currentUser.sendEmailVerification();
                    user.description = '';
                    user.image = '';
                    user.id = res.uid;
                    user.type = 'user';
                    localStorage.setItem("current", "user");
                })
                .catch(e => {
                    this.setState({ errorMessage: e.message })
                });

        } else {
            const obj = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                confirmedPassword: this.state.confirmedPassword,
                languages: this.state.languages
            }
            const objErrors = this.state.validErrors;
            for (let key in obj) {
                if (obj[key] === "" || obj[key].length === 0) {
                    objErrors[key] = false
                }
            }
            console.log('not equal');
        }
        this.setState({
            ...this.state
        });
    }


    handleSubmit(e) {
        e.preventDefault();
        this.signUpUser();
    }


    render() {

        const languages = ['HTML', 'CSS', 'JavaScript', 'Java', 'Python', 'C#', 'Ruby', 'Swift', 'React', 'Redux', 'C++', 'PHP', 'MySQL'];

        const { firstName, lastName, email, password, confirmedPassword, skillsContent, validErrors, progress, progressColor, progressColorConfirm, errorMessage } = this.state;
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>

                <div className='registration user-registration'>
                    <div className='Logwrapper'>
                        <LoginDiv>Register</LoginDiv>
                        {errorMessage !== "" && <div className="errorMessage">{errorMessage}</div>}
                        {validErrors.firstName === false && firstName === "" ?
                            <input
                                className='info-field eror'
                                placeholder='Write Your First Name *'
                                type="text"
                                value={firstName}
                                onChange={(e) => this.changeField(e, 'firstName')}
                            /> :
                            <input
                                className='info-field'
                                placeholder='First Name *'
                                type="text"
                                value={firstName}
                                onChange={(e) => this.changeField(e, 'firstName')}
                            />}
                        {validErrors.lastName === false && lastName === "" ?
                            <input
                                className='info-field eror'
                                placeholder='Write Your Last Name *'
                                type="text"
                                value={lastName}
                                onChange={(e) => this.changeField(e, 'lastName')}
                            /> :
                            <input
                                className='info-field'
                                placeholder='Last Name *'
                                type="text"
                                value={lastName}
                                onChange={(e) => this.changeField(e, 'lastName')}
                            />}
                        {validErrors.email === false && email === "" ?
                            <input
                                className='info-field eror'
                                placeholder='Write Your Email *'
                                type="email"
                                value={email}
                                onChange={(e) => this.changeField(e, 'email')}
                            /> :
                            <input
                                className='info-field'
                                placeholder='Email *'
                                type="email"
                                value={email}
                                onChange={(e) => this.changeField(e, 'email')}
                            />}
                        {validErrors.password === false && password === "" ?
                            <input
                                className='info-field password eror'
                                placeholder='Write Your Password *'
                                type="password"
                                value={password}
                                onChange={(e) => this.changeField(e, 'password')}
                            /> :
                            <input
                                className='info-field password'
                                placeholder='Password *'
                                type="password"
                                value={password}
                                onChange={(e) => this.changeField(e, 'password')}
                            />}
                        {validErrors.password === false && password === "" ?
                            <progress max="100" value={progress} className={`progress ${progressColor} eror`}></progress> :
                            <progress max="100" value={progress} className={`progress ${progressColor}`}></progress>}
                        {validErrors.confirmedPassword === false && confirmedPassword === "" ?
                            <input
                                className='info-field password eror'
                                placeholder='Write Your Confirme Password *'
                                type="password"
                                value={confirmedPassword}
                                onChange={(e) => this.changeField(e, 'confirmedPassword')}
                            /> :
                            <input
                                className='info-field password'
                                placeholder='Confirm Password *'
                                type="password"
                                value={confirmedPassword}
                                onChange={(e) => this.changeField(e, 'confirmedPassword')}
                            />}
                        {validErrors.password === false && password === "" ?
                            <progress max="100" value="100" className={`progressConfirm ${progressColorConfirm} eror`}></progress> :
                            <progress max="100" value="100" className={`progressConfirm ${progressColorConfirm}`}></progress>}
                        {validErrors.languages === false && this.state.languages.length === 0 &&
                            <div style={{color: "red"}}>Checked your skills!</div>}
                        <div className="skills">
                            CHOOSE SKILLS*
                            {skillsContent ?
                                <span
                                    className="sortArrowBottom"
                                >
                                </span> :
                                <span
                                    className="sortArrowTop"
                                    onClick={this.showSkills.bind(this)}>
                                </span>}
                            <div className="absolute" onClick={this.showSkills.bind(this)} />
                            {<div className={skillsContent ? "skills-content" : "skills-content-none"}>
                                {
                                    languages.map((item, index) => {
                                        return (
                                            <div className="skill" key={index}>
                                                <input
                                                    type="checkbox"
                                                    onChange={e => this.changeCheckboxHandler(e, item)} />
                                                <span>{item}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>}
                        </div>
                        <div className="textInformation">
                            By creating an account, you creating to DigiLearn <span>Privacy Policy</span> and <span>Terms of use</span>
                        </div>
                        <input type="submit" className="submit" value="CREATE ACCOUNT" />
                    </div>

                </div>
            </form>

        );
    }

}

export default UserRegistration;