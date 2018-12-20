import {combineReducers} from 'redux';
import testCreator from './testCreator';
import testPasser from './testPasser';
import appReducer from './appReducer';

const rootReducer = combineReducers({
    testCreator: testCreator,
    testPasser: testPasser,
    appReducer: appReducer,
});

export default rootReducer;


