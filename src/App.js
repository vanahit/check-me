import React, { Component } from 'react';
import './App.css';
import { Route, Switch, withRouter } from "react-router-dom";
import TestCreator from './components/TestCreator/TestCreator';
import TestEditor from './components/TestCreator/TestEditor';
import AboutUs from './components/AboutUs/AboutUs';
import Authorization from "./components/Autorization/Authorization";
import AutorizationUser from "./components/Autorization/AutorizationUser";
import AutorizationCompany from "./components/Autorization/AutorizationCompany";
import Company from "./components/CompanyProfile/Company";
import CompaniesInUser from "./components/CompanyInfoPage/CompaniesInUser";
import UsersInCompany from "./components/UserInfoPage/UsersInCompany";
import AllTests from "./components/AllTests";
import AllCompanies from "./components/AllCompanies";
import AllUsers from "./components/AllUsers";
import User from "./components/UserProfile/User";
import NoMatch from "./components/NoMatch";
import HomePage from "./components/HomePage/HomePage";
import { connect } from 'react-redux';
import { getCompanies, getTests, getUsers } from './store/thunks/thunks';
import * as firebase from "firebase";
import Layout from "./Hoc/Layout";
import PopUpTestAdded from './components/PopUps/PopUpTestAdded';
import OneTestInfo from './components/TestInfoPage/OneTestInfo';
import TestPassPanel from './components/TestPassPanel/TestPassPanel';


class App extends Component {

    state = {
        currentLog: null,
        userTestAdded: false,
        user: null

    };
    passers = 0;

    componentDidMount() {
        
        firebase.auth().onAuthStateChanged((currentLog) => {
            if (currentLog) {
                this.setState({ currentLog });

                if (localStorage.getItem("current") === "company") {
                       firebase.database().ref(`companies/${currentLog.uid}`).on('value', (snapshot) => {

                        if (snapshot.val()) {
                            this.setState({ currentLog, user: { ...snapshot.val() } })
                        }
                    })
                }
                if (localStorage.getItem("current") === "user") {
                    firebase.database().ref(`user/${currentLog.uid}`).on('value', (snapshot) => {
                        let user = {};
                        let tests = [];
                        if (snapshot.hasChild('tests')) {
                            snapshot.child('tests').forEach(childSnapshot => {
                                tests.push({
                                    id: childSnapshot.key,
                                    ...childSnapshot.val()
                                })
                            })
                        } else {
                            tests = [];
                        }
                        user = {
                            id: snapshot.key,
                            ...snapshot.val(),
                            tests
                        }
                        if (snapshot.val()) {
                            this.setState({ currentLog, user: user });
                        }
                    })
                }
              
            } else {
                localStorage.removeItem("current")
                this.setState({ currentLog: null, user: null })
            }
        });
        this.props.getCompanies();
        this.props.getTests();
        this.props.getUsers();
    }


    
    userTestAdded = () => {
        this.setState({ userTestAdded: !this.state.userTestAdded });
    }
    addCurrentItem = (currentItem) => {
        this.setState({ currentItem: currentItem });
    }

    render() {
       let userUnpassedTest = [];
       if (this.state.user && this.state.user.type === 'user') {
        userUnpassedTest = this.state.user.tests.filter(test => test.userScore === -1);
        }
        return (
            <div>
                {this.state.userTestAdded &&
                    <PopUpTestAdded exists={false} userTestAdded={this.userTestAdded} user={this.state.user}>
                        added to tests in your propfile
                    </PopUpTestAdded>
                }
                <Layout currentLog={this.state.currentLog} user={this.state.user}>
                    <Switch className="App">
                        <Route exact path={'/'} component={() =>
                            <HomePage
                                
                                userTestAdded={this.userTestAdded}
                                user={this.state.user}
                                addCurrentItem={this.addCurrentItem}

                            />} />
                        <Route path="/tests/" component={() =>
                            <AllTests
                                
                                userTestAdded={this.userTestAdded}
                                user={this.state.user}
                            />} />
                        {this.props.companies && this.props.companies.map(item => {
                            return (
                                <Route
                                    key={item.id}
                                    path={`/company-info-page/${item.id}-${item.name}`}
                                    component={() => 
                                    <CompaniesInUser 
                                        item={item}
                                        
                                        userTestAdded={this.userTestAdded}
                                        user={this.state.user}
                                     />} 
                                />
                            )
                        })}
                          {this.props.users && this.props.users.map(item => {
                            return (
                                <Route 
                                    key={item.id}
                                    path={`/user-info-page/${item.id}-${item.firstName}${item.lastName}`}
                                    component={() => <UsersInCompany
                                        currentUser={this.state.user} 
                                        item={item} 
                                        userId={this.state.user ? this.state.user.id : 1} passers={this.passers && this.passers}/>} />
                            )
                        })}
                         {this.props.tests && this.props.tests.map(item => {
                            return (
                                <Route 
                                key={item.id}
                                    path={`/test-info-page/${item.id}`} component={() =>
                                    <OneTestInfo
                                        user={this.state.user}
                                        item={item}
                                        
                                        userTestAdded={this.userTestAdded}
                                    />} />
                            )
                        })}
                        
    
                        {this.props.tests && this.props.tests.map(item => {
                            this.passers = item.passers;
                            return (
                                <Route 
                                    key={item.id}
                                    path={`/${item.companyId}-${item.company}/test${item.id}`} component={() => <AllUsers  passers={item.passers ? item.passers : 'no'}/>} />
                            )
                        })}

                        <Route path="/autorization-company" component={() => <AutorizationCompany  user={this.state.user} />}  />
                        <Route path="/autorization-user" component={() => <AutorizationUser user={this.state.user}/>}  />
                        <Route path="/aboutUs/" component={AboutUs} />
                        <Route path='/registration/user' component={AutorizationUser} />
                        <Route path='/registration/company' component={AutorizationCompany} />
                        <Route path="/users/" component={AllUsers} />
                        <Route path="/companies/" component={() => <AllCompanies addCurrentItem={this.addCurrentItem} />} />
                        <Route
                            path='/authorization/'
                            component={() => <Authorization currentLog={this.state.currentLog}
                                user={this.state.user} />}
                        />

                        {this.state.user && this.state.user.type === 'user'
                            ? <Switch>
                                {userUnpassedTest && userUnpassedTest.map(test => {
                                return(<Route 
                                        key={Date.now() + test.id}
                                        path={`/passing-test/${test.id}`} component={() =>
                                    <TestPassPanel test={test} user={this.state.user}   />} />)
                                })}
                                <Route path="/:user/profile" component={() => <User currentCompany={this.state.currentLog} user={this.state.user} />} />
                                <Route path="/:user/tests" component={() => <User currentCompany={this.state.currentLog} user={this.state.user} />} /> 
                                <Route component={NoMatch} />
                            </Switch>

                            : <Switch>
                                <Route path="/:company/add-test" component={() => <TestCreator user={this.state.user} />} />
                                <Route path="/:company/edit-test" component={() =>
                                    <TestEditor editingTest={this.props.editingTest} user={this.state.user} />}
                                />
                                <Route path="/:company/profile" component={() =>
                                    <Company
                                        currentCompany={this.state.currentLog}
                                        user={this.state.user}
                                         />} />
                                <Route path="/:company/tests" component={() =>
                                    <Company
                                        currentCompany={this.state.currentLog}
                                        user={this.state.user}
                                         />} />
                                <Route path="/:company/invited-users" component={() =>
                                    <Company
                                        currentCompany={this.state.currentLog}
                                        user={this.state.user}
                                         />} />
                                <Route component={NoMatch} />
                            </Switch>
                        }

                        <Route component={NoMatch} />

                    </Switch>
                </Layout>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        editingTest: state.appReducer.editingTest,
        users: state.appReducer.users,
        companies: state.appReducer.companies,
        tests: state.appReducer.tests,
        test: state.testPasser.testDetails,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCompanies: companies => dispatch(getCompanies(companies)),
        getTests: tests => dispatch(getTests(tests)),
        getUsers: users => dispatch(getUsers(users)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
