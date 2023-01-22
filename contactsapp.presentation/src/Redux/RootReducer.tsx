import { combineReducers } from 'redux';
import apiUrl from './APIUrl';
import contactList from './ContactsList';

const rootReducer  = combineReducers({
    apiUrl,
    contactList,
});

export default rootReducer;