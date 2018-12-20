import React, {Component} from 'react';
import * as firebase from "firebase";
import styled from 'styled-components';

const LoginDiv = styled.div`
    font-size: 34px;
    color: white;
    font-weight: bold;
    text-align: center;
    margin-bottom: 60px;
`;

class CompanyRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmedPassword: '',
            validErrors: {name: true, email: true, password: true, confirmedPassword: true},
            progress: 0,
            progressColor: "red",
            progressColorConfirm: "white",
            errorMessage: "",
            unmounted: false,
        }
        this.changeField = this.changeField.bind(this);
    }



    changeField(e, field) {
        this.setState({
            [field]: e.target.value,
        })
        if(field === "password"){
            this.checkPassword(e.target.value)
            this.checkConfirmedPassword(e.target.value, this.state.confirmedPassword)
        }
        if(field === "confirmedPassword"){
            this.checkConfirmedPassword(this.state.password, e.target.value)
        }
    }

     checkPassword (password) {
        let strength = 0;
        if( password.match(/[a-zA-Z0-9][a-zA-Z0-9]+/) ) {
            strength += 1
        }
        if( password.match(/[~<>?]+/) ) {
            strength += 1
        }
        if( password.match(/[!@$%^&*()]+/) ) {
            strength += 1
        }
        if( password.match(/[A-Z]/g) ) {
            strength += 1
        }
        if( password.match(/[0-9]/g) ) {
            strength += 1
        }

        switch(strength){
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



    checkConfirmedPassword (password, confirmedPassword) {
        if(password.substr(0,confirmedPassword.length) === confirmedPassword && confirmedPassword.length === password.length && confirmedPassword.length !== 0){
            this.setState({progressColorConfirm: "green"})
        } else if(confirmedPassword.length === 0) {
            this.setState({progressColorConfirm: "white"})
        } else if(password.substr(0,confirmedPassword.length) === confirmedPassword && confirmedPassword.length !== password.length){
            this.setState({progressColorConfirm: "orange"})
        } else {
            this.setState({progressColorConfirm: "red"})
        }
    }

    signUpCompany() {
        this.setState({unmounted: false});
        if (this.state.password === this.state.confirmedPassword && this.state.password  && this.state.name && this.state.email) {

            const company = {...this.state};
          
            firebase.auth()
                .createUserWithEmailAndPassword(company.email, company.password)
                .then(res => {
                    company.description = '';
                    company.image = '';
                    company.test = {};
                    company.id = res.uid;
                    company.type='company';
                    localStorage.setItem("current", "company");
                    firebase.database().ref(`companies/${res.uid}`).set(company);
                    if (!this.state.unmounted) {
                        this.setState({errorMessage: ""})
                        firebase.auth().currentUser.sendEmailVerification();
                    }
                })
                .catch(e => {
                   
                    this.setState({errorMessage: e.message})
                    console.log(e.message)
                    
                })


        } else {
             const obj = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmedPassword: this.state.confirmedPassword,
            }
            const objErrors = this.state.validErrors;
            for(let key in obj){
                if(obj[key] === ""){
                    objErrors[key] = false
                }
            }
            console.log('not equal');
        }
        this.setState({
            ...this.state
        });
    }

    ComponentWillUnmount () {
        this.setState({unmounted: true});
    }
    handleSubmit(e) {
        e.preventDefault();
        this.signUpCompany();
    }


    render() {
        const {name, email, password, confirmedPassword, validErrors, progress, progressColor, progressColorConfirm, errorMessage} = this.state;

        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className='registration company-registration'>
                    <div className='Logwrapper'>
                        <LoginDiv>Register</LoginDiv>
                        {errorMessage !== "" && <div className="errorMessage">{errorMessage}</div>}
                        {validErrors.name === false && name==="" ? 
                            <input
                                className='info-field eror'
                                placeholder='Write Your Name *'
                                type="text"
                                value={name}
                                onChange={(e) => this.changeField(e, 'name')}
                            /> : 
                            <input
                                className='info-field'
                                placeholder='Name *'
                                type="text"
                                value={name}
                                onChange={(e) => this.changeField(e, 'name')}
                            /> }
                        {validErrors.email === false && email==="" ? 
                            <input
                                className='info-field eror'
                                placeholder='Write Your Email *'
                                type="text"
                                value={email}
                                onChange={(e) => this.changeField(e, 'email')}
                            /> : 
                            <input
                                className='info-field'
                                placeholder='Email *'
                                type="text"
                                value={email}
                                onChange={(e) => this.changeField(e, 'email')}
                            /> }
                        {validErrors.password === false && password==="" ? 
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
                            /> }
                        {validErrors.password === false && password==="" ?
                             <progress max="100" value={progress} className={`progress ${progressColor} eror`}></progress>:
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
                            /> }
                        {validErrors.password === false && password==="" ?
                             <progress max="100" value="100" className={`progressConfirm ${progressColorConfirm} eror`}></progress>:
                              <progress max="100" value="100" className={`progressConfirm ${progressColorConfirm}`}></progress>}

                        <p>By creating an account,you agree to
                            DigiLearn <span style={{color: '#FFAD5A'}}>Privacy Policy</span> and <br/><span
                                style={{color: '#FFAD5A', marginBottom: '15px'}}>Terms of use</span>.</p>
                            <input className="submit" type="submit" value="CREATE ACCOUNT" />
                    </div>
                </div>
            </form>
           
        );
    }
}

export default CompanyRegistration;
