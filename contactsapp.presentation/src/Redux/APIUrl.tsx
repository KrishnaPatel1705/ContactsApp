import initialState from "./InitialState";
import * as auth from '../API/AuthContextAPI';
import { getConfig } from '../API/ContactsAPI';

export default function apiUrlReducer(state = initialState.apiUrl, action: any) {
    switch(action.type){
        case "Set_ApiUrl" :
            return { apiUrl : action.apiUrl };
        default : 
            return state;
    }
}

export function getApiUrl() {
    return async function (dispatch : any) {
        return await auth.getApiUrl().then(apiUrl => {
            dispatch({type: "Set_ApiUrl", apiUrl});
            dispatch(getConfig());
        }).catch(error => {
            throw error;
        })
    }
}