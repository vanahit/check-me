import {
    getCompaniesStarted,
    getCompaniesSuccess,
    getTestsStarted,
    getTestsSuccess,
    getUsersStarted,
    getUsersSuccess,

} from '../actions/appAction';
import { firebase } from '../../firebase/firebase';
import { addTest, getTestSuccess } from '../actions/testPasser';

export const getTests = () => {
    return dispatch => {
        dispatch(getTestsStarted());

        firebase.database().ref('tests').on('value', (snapshot) => {
            let tests = [];
            let passers = [];
            snapshot.forEach(childSnapshot => {
                if (childSnapshot.hasChild('passers')) {
                   let passersObj = {};
                    childSnapshot.child('passers').forEach(snapshot1 => {
                        
                        passersObj = {
                            ...passersObj,
                            [snapshot1.key]: { id: snapshot1.key, ...snapshot1.val() }
                            
                        }
                        passers = Object.values(passersObj);
                    })
                } else {
                    passers = [];
                }
                if (childSnapshot.hasChild('passers')) {
                    tests.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val(),
                        passers
                    })
                } else {
                    tests.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val(),
                    })
                }

            });
            let filteredTests = [];
            tests.sort(function (a, b) { return b.testCreateDate - a.testCreateDate });
            filteredTests = tests.filter(test => !test.deleted)


            dispatch(getTestsSuccess(filteredTests));
        });
    }
};

export const getCompanies = () => {
    return dispatch => {
        dispatch(getCompaniesStarted());

        firebase.database().ref('companies').on('value', (snapshot) => {
            let companies = [];

            snapshot.forEach(childSnapshot => {
                companies.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            });

            dispatch(getCompaniesSuccess(companies));
        });
    }
};

export const getUsers = () => {
    return dispatch => {
        dispatch(getUsersStarted());

        firebase.database().ref('user').on('value', (snapshot) => {
            let users = [];
            let tests = [];
            snapshot.forEach(childSnapshot => {
                if (childSnapshot.hasChild('tests')) {
                    let testsObj = {};
                    childSnapshot.child('tests').forEach(snapshot1 => {
                       
                        testsObj = {
                            ...testsObj,
                            [snapshot1.key]: { id: snapshot1.key, ...snapshot1.val() }
                            
                        }
                        tests = Object.values(testsObj);
                    })
                } else {
                    tests = [];
                }
                if (childSnapshot.hasChild('tests')) {
                    users.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val(),
                        tests
                    })
                } else {
                    users.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val(),
                    })
                }

            });
            dispatch(getUsersSuccess(users));
        });
    }
};

export const getPassingTest = (test) => {
    return dispatch => {
        new Promise(resolve => {
            dispatch(addTest(test));
            resolve(test);
        }).then(test => {
            dispatch(getTestSuccess());
        })
    }
}
