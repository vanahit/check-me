import React, {Component} from 'react';
import {Redirect} from "react-router";
// import database from '../../firebase/firebase';
import firebase from 'firebase';

class CompanyPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data:[],
            selectedTab: 'profile',
        }
    }


    changeTab(tab) {
        this.setState({
            selectedTab: tab
        })
    }

    componentDidMount() {
        console.log(this.props.currentCompany);
        firebase.database().ref('companies').on('value', (snapshot) => {
            const companies = [];
            snapshot.forEach(childSnapshot => {
                companies.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            });
            this.setState({data: companies});
            console.log(this.state.data)

        });
    }

    render() {
        return (
            (this.props.currentCompany) ?
                <div>
                    <div className='switch-buttons'>
                        <p>Home/Login Company</p>
                        <button className={this.state.selectedTab === 'profile' ? 'selected-tab' : null}
                                onClick={() => this.changeTab('profile')}>PROFILE
                        </button>
                        <button className={this.state.selectedTab === 'tests' ? 'selected-tab' : null}
                                onClick={() => this.changeTab('tests')}>TESTS
                        </button>
                        <button className={this.state.selectedTab === 'invitedUsers' ? 'selected-tab' : null}
                                onClick={() => this.changeTab('invitedUsers')}>INVITED USERS
                        </button>
                    </div>
                    <div>
                        <div className='company-profile'>
                            <div className='profile-logo'/>
                            <div className='profile-synopsis'>
                                <div className='profile-synopsis-name'>Company name</div>
                                <div className='quote'>The <span>software agency</span> that doesnt work for you</div>
                                <div>juierfhreuifheruifheruifheriufweruifhreiwfhruiehf
                                    erfheriufhweruifheruifheriuwfhreipfhwerifphre
                                    erfheriufhweruifheruifheriuwfhreipfhwerifphre
                                    erfheriufhweruifheruifheriuwfhreipfhwerifphre
                                    erfheriufhweruifheruifheriuwfhreipfhwerifphre
                                    erfheriufhweruifheruifheriuwfhreipfhwerifphre
                                    erfheriufhweruifheruifheriuwfhreipfhwerifphre
                                    erfheriufhweruifheruifheriuwfhreipfhwerifphre
                                    erfheriufhweruifheruifheriuwfhreipfhwerifphre
                                    efierwhfiefhrirhewuifhreifherwifuheruifwhrifweh
                                </div>
                            </div>
                        </div>
                        <div className='profile-find-employee'>
                            <div className='profile-create-test'>
                                <div>
                                    <div className='checked-icon'>
                                        <img src={require('../../images/checkbox.png')}/>
                                        <span>You can find employe.</span>
                                    </div>
                                    <div className='checked-icon'>
                                        <img src={require('../../images/checkbox.png')}/>
                                        <span>You can add your own test.</span>
                                    </div>
                                </div>
                                <div className='profile-buttons'>
                                    <button>FIND EMPLOYEE</button>
                                    <button>CREATE TEST</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <Redirect to='/authorization'/>
        );
    }
}


export default CompanyPage;
